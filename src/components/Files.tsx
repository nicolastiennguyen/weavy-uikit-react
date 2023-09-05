import React, { useState, useContext, useEffect, useCallback } from 'react';
import { WeavyContext } from '../contexts/WeavyContext';
import { FilesProps } from '../types/Files';
import useFiles from '../hooks/useApps';
import classNames from 'classnames';
import FileList from './FileList';
import Dropdown from '../ui/Dropdown';
import Icon from '../ui/Icon';
import Button from '../ui/Button';
import Spinner from '../ui/Spinner';
import Sheet from '../ui/Sheet';
import FileItem from './FileItem';
import useCloudFiles from '../hooks/useCloudFiles';
import { useMutateFileUpload, useMutateFileCreate, useMutatingFileUploads, useRemoveMutatingFileUpload, CreateFileProps, FileMutation } from '../hooks/useMutateFile';
import { useMutateFilesCreate } from '../hooks/useMutateFiles';
import { useSessionState } from '../hooks/useSessionState';
import { useMutateAppsSubscribe } from '../hooks/useMutateApps';
import openUrl from '../utils/openUrl';
import { useDropzone } from 'react-dropzone';
import { BlobType, FileOrder, FileType, FileView } from '../types/types';
import useFeatures from '../hooks/useFeatures';
import { Feature, hasFeature } from '../utils/featureUtils';


import Modal from 'react-modal';
import { UserContext } from '../contexts/UserContext';
import { useHistory, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';



const Files = ({
    uid,
    className,
    view: initView = "list",
    order: initOrder = { by: "name", descending: false },
    trashed: initTrashed = false,
    features
}: FilesProps) => {
    const { client } = useContext(WeavyContext);
    const [selectedFiles, setSelectedFiles] = useState<string>("");

    const { user } = useContext(UserContext)
    const [appId, setAppId] = useState<number>(15);
    const [navigationPath, setNavigationPath] = useState([])
    const [navigationPathIDs, setNavigationPathIDs] = useState({
        'Home': 15
    })

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [folderName, setFolderName] = useState('');

    const history = useHistory();

    if (!client) {
        throw new Error('Weavy Files component must be used within an WeavyProvider');
    }

    // init app
    const { isLoading, data } = useFiles(uid, {});
    const { isLoading: isLoadingFeatures, data: dataFeatures } = useFeatures("files", {});

    const mutateFilesSubscribe = useMutateAppsSubscribe(["apps", uid]);

    const [showUploadDetails, setShowUploadDetails] = useState<boolean>(false);


    const tags = []
    navigationPath.forEach(path => {
        if (navigationPathIDs[path] !== undefined) {
            tags.push(navigationPathIDs[path])
        }
    })

    const createFile = useMutateFilesCreate(appId!, tags);
    const uploadFileMutation = useMutateFileUpload(['files', appId!], createFile);
    const createFileMutation = useMutateFileCreate(['files', appId!], createFile);
    const { mutations, status, progress } = useMutatingFileUploads(['files', appId!]);
    const removeMutatingFileUpload = useRemoveMutatingFileUpload(['files', appId!]);

    let fileInput: HTMLInputElement | null;

    const [view, setView] = useSessionState<FileView>(`files-view-${uid}`, initView);
    const [order, setOrder] = useSessionState<FileOrder>(`files-order-${uid}`, initOrder);
    const [showTrashed, setShowTrashed] = useSessionState<boolean>(`files-trashed-${uid}`, initTrashed);


    //     useEffect(() => {
    //     const currentPath = history.location.pathname;
    //     console.log(currentPath)
    //     const targetAppId = history.location.pathname.slice(7);
    //     setAppId(targetAppId)
    // }, [history]);


    // on first load only
    // useEffect(() => {
    //     if (data) {
    //         const storedAppId = Cookies.get('appId')
    //         const storedNavigationPath = Cookies.get('navigationPath');
    //         const storedNavigationPathIDs = Cookies.get('navigationPathIDs');

    //         if (data.id != appId && storedAppId !== undefined) {
    //             setAppId(storedAppId)
    //             Cookies.set('appId', storedAppId)
    //             history.push(`/files/${storedAppId}`)
    //             // If the cookie value is empty or undefined, trying to parse it as JSON will result in an error
    //             if (storedNavigationPath && storedNavigationPathIDs) {
    //                 setNavigationPath(JSON.parse(storedNavigationPath))
    //                 setNavigationPathIDs(JSON.parse(storedNavigationPathIDs))
    //             }
    //         } else {
    //             setAppId(data.id)
    //             Cookies.set('appId', data.id)
    //             history.push('')
    //             setNavigationPath(['Home'])
    //         }
    //     } else {
    //         setAppId(15);
    //     }
    // }, [data]);

    useEffect(() => {
        if (data) {
            const storedAppId = Cookies.get('appId');
            const storedNavigationPath = Cookies.get('navigationPath');
            const storedNavigationPathIDs = Cookies.get('navigationPathIDs');

            if (data.id !== appId && storedAppId !== undefined) {
                setAppId(storedAppId);
                history.push(`/files/${storedAppId}`);
                if (storedNavigationPath && storedNavigationPathIDs) {
                    setNavigationPath(JSON.parse(storedNavigationPath));
                    setNavigationPathIDs(JSON.parse(storedNavigationPathIDs));
                }
            } else {
                const currentPath = history.location.pathname;
                const parts = currentPath.split('/');
                if (parts.length >= 3 && parts[1] === 'files') {
                    const targetAppId = parseInt(parts[2], 10);
                    setAppId(targetAppId);
                    history.push(`/files/${targetAppId}`);
                    console.log(storedNavigationPath, storedNavigationPathIDs)
                    if (storedNavigationPath && storedNavigationPathIDs) {
                        setNavigationPath(JSON.parse(storedNavigationPath));
                        setNavigationPathIDs(JSON.parse(storedNavigationPathIDs));
                    }
                } else {
                    setAppId(data.id);
                    Cookies.set('appId', data.id);
                    history.push('');
                    setNavigationPath(['Home']);
                }
            }
        } else {
            setAppId(15);
        }
    }, [data]);


    useEffect(() => {
        if (status === "error" || status === "conflict") {
            setShowUploadDetails(true);
        }
        if (mutations.length === 0) {
            setShowUploadDetails(false)
        }
    }, [status, mutations.length])

    // add external file
    const handleExternalFileAdded = (addedBlobs: BlobType[]) => {
        addedBlobs.forEach((blob) => handleCreateFile(blob));
    }

    const { openCloudFiles } = useCloudFiles(handleExternalFileAdded);

    const handleSubscribe = (subscribe: boolean) => {
        if (appId) {
            mutateFilesSubscribe.mutateAsync({ appId, subscribe })
        }
    }

    // add uploaded files
    const handleCreateFile = async (blob: BlobType, file?: FileType, replace?: boolean) => {
        console.log('1')
        let fileProps: CreateFileProps = { blob, file, replace };
        await createFileMutation.mutateAsync(fileProps, {
            onSuccess: (data: FileType) => {
                //console.log("All cloud files added")
            }
        });
    }

    // upload files
    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            for (var i = 0; i < e.target.files.length; i++) {
                let file = e.target.files[i];
                let fileProps = { file: file }
                uploadFileMutation.mutateAsync(fileProps, {
                    onSuccess: (data: BlobType) => {
                        //console.log("All files uploaded")
                    }
                });
            }
            setSelectedFiles("")
        }
    }

    // open file dialog
    const openFileInput = (e: any) => {
        //console.log("click")
        fileInput?.click();
    }

    // remove file attachment
    const handleRemoveUpload = (mutation: FileMutation) => {
        removeMutatingFileUpload(mutation);
    }

    const handleOverwriteUpload = (mutation: FileMutation) => {
        removeMutatingFileUpload(mutation);

        let fileBlob = mutation.state.context?.blob;
        if (fileBlob) {
            handleCreateFile(fileBlob, mutation.state.context?.file, true);
        }
    }
    // Pasted file(s)


    const handleDownloadArchive = () => {
        if (appId && data && data.archive_url) {
            //const archiveUrl = new URL(`/api/apps/${appId}/files.zip`, client.url).toString();
            openUrl(data.archive_url, "_top", `${uid}.zip`, true);
        }
    }

    const onDrop = useCallback((acceptedFiles: File[]) => {
        // this callback will be called after files get dropped, we will get the acceptedFiles. If you want, you can even access the rejected files too
        if (acceptedFiles.length > 0) {
            for (var i = 0; i < acceptedFiles.length; i++) {
                let file = acceptedFiles[i];
                let fileProps = { file: file }
                uploadFileMutation.mutateAsync(fileProps, {});
            }
            return true;
        }

    }, []);

    const { getRootProps, rootRef: pasteRef, isDragActive } = useDropzone({
        onDrop,
        noClick: true,
        noKeyboard: true,
        disabled: !appId
    });

    // Pasted file(s)
    const handlePaste = (evt: any) => {
        console.debug("File(s) pasted");
        let files: File[] = [];
        const items = (evt.clipboardData || evt.originalEvent.clipboardData).items;
        for (let index in items) {
            const item = items[index];
            if (item.kind === 'file') {
                files = [...files, item.getAsFile()];
            }
        }
        if (files.length) {
            for (var i = 0; i < files.length; i++) {
                let file = files[i];
                let fileProps = { file: file }
                uploadFileMutation.mutateAsync(fileProps, {
                    onSuccess: (data: BlobType) => {
                        //console.log("All files uploaded")
                    }
                });
            }
        }
    }

    const delegateHandlePaste = (evt: any) => {
        if (pasteRef.current) {
            var targ = evt.target;
            do {
                if (pasteRef.current === targ) {
                    handlePaste(evt);
                }
            } while ((targ = targ.parentNode) && targ !== evt.currentTarget);
        }
    }

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };


    const createFolder = async () => {
        await fetch(`https://f55a3cc1035a4031b8b0e57ae18814ee.weavy.io/api/apps/${appId}/files`, {
            method: "POST",
            headers: {
                'Authorization': `Bearer wys_oP6CJGJJ7hyYqcy5A56CPCwDaMToaM4M2VCP`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                blob_id: 15,
                name: folderName,
                metadata: {
                    type: "folder",
                },
                tags: tags
            })
        })
        setFolderName('')
    };


    const openFolder = async (folderName) => {
        try {
            const response = await fetch('https://f55a3cc1035a4031b8b0e57ae18814ee.weavy.io/api/apps/init', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer wys_oP6CJGJJ7hyYqcy5A56CPCwDaMToaM4M2VCP`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "app": {
                        "type": "files",
                        "uid": `${user.uid}-${appId}-${folderName.replace(/ /g, "-")}`,
                        "tags": tags,
                        metadata: {
                            parent_app_id: appId
                        },
                    },
                    "user": {
                        "uid": user.uid
                    }
                })
            });
            const data = await response.json()
            setAppId(data.id)
            Cookies.set('appId', data.id)
            history.push(`/files/${data.id}`);
            navigationPath.push(folderName)
            setNavigationPathIDs(prevMap => ({
                ...prevMap,
                [folderName]: data.id
            }))

            const res = await fetch(`https://f55a3cc1035a4031b8b0e57ae18814ee.weavy.io/api/apps/${appId}/files`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer wys_oP6CJGJJ7hyYqcy5A56CPCwDaMToaM4M2VCP`,
                    'Content-Type': 'application/json',
                },
            })
            const datas = await res.json()
            const files = datas.data
            files.forEach(file => {
                if (file.name === folderName) {
                    const temp = fetch(`https://f55a3cc1035a4031b8b0e57ae18814ee.weavy.io/api/files/${file.id}`, {
                        method: 'PATCH',
                        headers: {
                            'Authorization': `Bearer wys_oP6CJGJJ7hyYqcy5A56CPCwDaMToaM4M2VCP`,
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            metadata: {
                                type: "folder",
                                child_app_id: data.id
                            }
                        })
                    })
                }
            })

        } catch (error) {
            console.log(error)
        }
    }

    const returnHome = () => {
        Cookies.set('appId', 15)
        setAppId(Cookies.get('appId'))
        history.push('')
        setNavigationPath(['Home'])
        setNavigationPathIDs({
            'Home': 15
        })
    }

    const handleFolderClick = (e, folderName) => {
        e.preventDefault();

        // Check if the folderName is already present in the navigationPath
        const isFolderInPath = navigationPath.includes(folderName);

        if (isFolderInPath) {
            // If the folder is already in the path, find its index in the array
            const folderIndex = navigationPath.indexOf(folderName);

            // If the folder is not the last one in the path, remove all the folders after it
            if (folderIndex < navigationPath.length - 1) {
                setNavigationPath(prevPath => prevPath.slice(0, folderIndex + 1));
            }
            const newAppId = navigationPathIDs[folderName];
            setAppId(newAppId)
            history.push(`/files/${newAppId}`)


            const updatedNavigationPathIDs = {};
            if (folderIndex >= 0) {
                for (let i = 0; i <= folderIndex; i++) {
                    const currentFolder = navigationPath[i];
                    updatedNavigationPathIDs[currentFolder] = navigationPathIDs[currentFolder];
                }
            }
            setNavigationPathIDs(updatedNavigationPathIDs)

        }
    };

    useEffect(() => {
        const handleBeforeUnload = () => {
            Cookies.set('appId', appId)
            Cookies.set('navigationPath', JSON.stringify(navigationPath))
            Cookies.set('navigationPathIDs', JSON.stringify(navigationPathIDs))
        };

        const handlePopState = async () => {
            console.log('Back button pressed! For this appId:', appId);
            const response = await fetch(`https://f55a3cc1035a4031b8b0e57ae18814ee.weavy.io/api/apps/${appId}/`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer wys_oP6CJGJJ7hyYqcy5A56CPCwDaMToaM4M2VCP`,
                }
            })
            const data = await response.json()
            console.log(data)
            if (data && data.metadata && data.metadata.parent_app_id) {
                setAppId(data.metadata.parent_app_id)
                history.push(`/files/${data.metadata.parent_app_id}`)
            } else {
                setAppId(15)
                history.push('')
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);
        window.addEventListener('popstate', handlePopState);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
            window.removeEventListener('popstate', handlePopState);
        };
    }, [appId]);

    useEffect(() => {
        if (appId) {
            document.addEventListener("paste", delegateHandlePaste);
            return () => {
                document.removeEventListener("paste", delegateHandlePaste);
            }
        }
    }, [appId])

    if (!isLoading && !data) {
        return <div>No files app with the contextual id <strong>{uid}</strong> was found.</div>;
    }

    const renderNavigationPath = () => {
        return (
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    {navigationPath.map((path, index) => {
                        const isLastIndex = index === navigationPath.length - 1;

                        return (
                            <React.Fragment key={index}>
                                {index > 0 && (
                                    <Icon.UI
                                        name="chevron-right"
                                        className="chevron-icon"
                                    />
                                )}
                                <li className={`breadcrumb-item ${isLastIndex ? 'is-last' : ''}`} title={path}>
                                    {isLastIndex ? (
                                        <span>{path}</span>
                                    ) : (
                                        <a href="#" onClick={(e) => handleFolderClick(e, path)} className="folder-link">{path}</a>
                                    )}
                                </li>
                            </React.Fragment>
                        );
                    })}
                </ol>
            </nav>
        );
    };




    return (
        <>
            {appId && dataFeatures &&
                <div className={classNames("wy-files", className, { "wy-files-dragging": isDragActive })} {...getRootProps()}>
                    <header className="wy-appbars">
                        <nav className="wy-toolbar">

                            <div className="wy-toolbar-buttons">
                                {/* <button onClick={returnHome}>Home</button> */}
                                {(hasFeature(dataFeatures, Feature.Attachments, features?.attachments) || hasFeature(dataFeatures, Feature.CloudFiles, features?.cloudFiles)) &&
                                    <Dropdown.UI title="Add files" disabled={!appId} buttonContent={
                                        <><Icon.UI name="plus" /></>
                                    }>
                                        {hasFeature(dataFeatures, Feature.Attachments, features?.attachments) &&
                                            <>
                                                <Dropdown.Item onClick={openModal}>
                                                    <Icon.UI name="folder" /> Add folder
                                                </Dropdown.Item>
                                                <Modal
                                                    isOpen={modalIsOpen}
                                                    onRequestClose={closeModal}
                                                    className="files-modal"
                                                    overlayClassName="files-modal-overlay"
                                                >
                                                    <button className="close-button" onClick={closeModal}>
                                                        <Icon.UI name="close" />
                                                    </button>
                                                    <h2>Create New Folder</h2>
                                                    <input
                                                        type="text"
                                                        value={folderName}
                                                        onChange={(e) => setFolderName(e.target.value)}
                                                        placeholder="Enter folder name"
                                                        className="input-field"
                                                    />
                                                    <div className="button-container">
                                                        <button onClick={() => {
                                                            createFolder();
                                                            closeModal();
                                                        }} className="create-button">
                                                            Create Folder
                                                        </button>
                                                    </div>
                                                </Modal>
                                                <Dropdown.Item onClick={openFileInput}><Icon.UI name="attachment" /> Upload file</Dropdown.Item>
                                                <input type="file" value={selectedFiles} ref={input => fileInput = input} onChange={handleFileUpload} multiple hidden tabIndex={-1} />
                                            </>
                                        }
                                        {hasFeature(dataFeatures, Feature.CloudFiles, features?.cloudFiles) &&
                                            <Dropdown.Item onClick={openCloudFiles}><Icon.UI name="cloud" /> From cloud</Dropdown.Item>
                                        }
                                    </Dropdown.UI>
                                }

                            </div>

                            <div className="wy-toolbar-buttons wy-toolbar-buttons-last">
                                {mutations.length > 0 && <Button.UI onClick={() => setShowUploadDetails(!showUploadDetails)}>
                                    {
                                        status === "conflict" ? <Icon.UI name="alert" color="yellow" title="File conflict" /> :
                                            status === "error" ? <Icon.UI name="alert-octagon" color="error" title="Upload error" /> :
                                                status === "pending" ? <Spinner.UI spin={progress === undefined} progress={progress} /> :
                                                    <Icon.UI name="check" title='All uploads finished' />
                                    }
                                </Button.UI>}
                                <Sheet.UI title={"Uploads"} isOpen={showUploadDetails} onClose={() => setShowUploadDetails(false)}>
                                    {mutations.map((mutation) => {
                                        let file = mutation.state.context?.file;
                                        if (file) {
                                            return (
                                                <FileItem.Item key={"file-mutation" + mutation.mutationId} features={dataFeatures} appFeatures={features} file={file} statusText={file.status === "conflict" ? "Replace existing file?" : ''} title={file.name + (file.statusText ? `: ${file.statusText}` : '')}>
                                                    <div className='wy-item-actions'>
                                                        {file.status === "conflict" && <>
                                                            <Button.UI onClick={handleOverwriteUpload.bind(Files, mutation)} title="Replace"><Icon.UI name='check' /></Button.UI>
                                                        </>}
                                                        <Button.UI onClick={handleRemoveUpload.bind(Files, mutation)} title="Discard"><Icon.UI name='close' /></Button.UI>
                                                    </div>
                                                </FileItem.Item>
                                            )
                                        }
                                        return undefined;
                                    })}
                                </Sheet.UI>

                                <Dropdown.UI icon="sort" title="Sort items by" directionX='left'>
                                    <Dropdown.Item className={classNames("wy-option", { "wy-selected": order.by === "name" })} onClick={(e: any) => setOrder({ ...order, by: "name" })}><Icon.UI name="check" /> Name</Dropdown.Item>
                                    <Dropdown.Item className={classNames("wy-option", { "wy-selected": order.by === "modified_at" })} onClick={(e: any) => setOrder({ ...order, by: "modified_at" })}><Icon.UI name="check" /> Modified</Dropdown.Item>
                                    <Dropdown.Item className={classNames("wy-option", { "wy-selected": order.by === "size" })} onClick={(e: any) => setOrder({ ...order, by: "size" })}><Icon.UI name="check" /> Size</Dropdown.Item>
                                    <Dropdown.Divider />
                                    <Dropdown.Item className={classNames("wy-option", { "wy-selected": !order.descending })} onClick={(e: any) => setOrder({ ...order, descending: false })}><Icon.UI name="check" /> Ascending</Dropdown.Item>
                                    <Dropdown.Item className={classNames("wy-option", { "wy-selected": order.descending })} onClick={(e: any) => setOrder({ ...order, descending: true })}><Icon.UI name="check" /> Descending</Dropdown.Item>
                                </Dropdown.UI>

                                <Dropdown.UI icon={view === "grid" ? "view-module-outline" : "view-list-outline"} title="View options" directionX='left'>
                                    <Dropdown.Item className={classNames("wy-option", { "wy-selected": view === "list" })} onClick={(e: any) => setView("list")}><Icon.UI name="check" /> List view</Dropdown.Item>
                                    <Dropdown.Item className={classNames("wy-option", { "wy-selected": view === "grid" })} onClick={(e: any) => setView("grid")}><Icon.UI name="check" /> Grid view</Dropdown.Item>
                                    <Dropdown.Divider />
                                    <Dropdown.Item className={classNames("wy-option", { "wy-selected": !showTrashed })} onClick={(e: any) => setShowTrashed(false)}><Icon.UI name="check" /> Hide trashed</Dropdown.Item>
                                    <Dropdown.Item className={classNames("wy-option", { "wy-selected": showTrashed })} onClick={(e: any) => setShowTrashed(true)}><Icon.UI name="check" /> Show trashed</Dropdown.Item>
                                </Dropdown.UI>

                                <Dropdown.UI directionX='left' disabled={isLoading || !data}>
                                    {data && <>
                                        {data.is_subscribed ?
                                            <Dropdown.Item onClick={() => handleSubscribe(false)}><Icon.UI name="bell-off" /> Unsubscribe</Dropdown.Item>
                                            :
                                            <Dropdown.Item onClick={() => handleSubscribe(true)}><Icon.UI name="bell" /> Subscribe</Dropdown.Item>
                                        }
                                        {data.archive_url &&
                                            <Dropdown.Item onClick={() => openUrl(data.archive_url, "_top", `${uid}.zip`, true)}><Icon.UI name="download" /> Download files</Dropdown.Item>
                                        }

                                    </>}
                                </Dropdown.UI>

                            </div>

                        </nav>
                    </header>
                    {renderNavigationPath()}

                    <FileList appId={appId} view={view} order={order} trashed={showTrashed} onSorting={(sortOrder) => setOrder(sortOrder)} onHandleError={(errorFile) => setShowUploadDetails(true)} features={dataFeatures} appFeatures={features} openFolder={openFolder} />
                </div>
            }
        </>




    )
}

export default Files;