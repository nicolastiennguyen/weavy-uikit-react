import React, { useContext, useEffect, useState } from 'react';
import useFileList from '../hooks/useFileList';
import useInfiniteScroll from '../hooks/useInfiniteScroll';
import FileItem from './FileItem';
import Button from '../ui/Button';
import useMutateFileRename from '../hooks/useMutateFileRename';
import { useMutateFileDeleteForever, useMutateFileRestore, useMutateFileTrash } from '../hooks/useMutateFileTrash';
import { useMutateFileSubscribe, useMutateFileUnsubscribe } from '../hooks/useMutateFileSubscribe';
import Spinner from '../ui/Spinner';
import Icon from '../ui/Icon';
import PreviewFiles from './PreviewFiles';
import { AppFeatures, FileOrder, FileOrderBy, FileType, FileView } from '../types/types';
import Modal from 'react-modal';

type Props = {
    appId: number,
    view?: FileView,
    order?: FileOrder,
    trashed?: boolean,
    features: string[],
    appFeatures: AppFeatures | undefined,
    onSorting?: (order: FileOrder) => void,
    onHandleError?: (file: FileType) => void
}

const FileList = ({ appId, view = "list", order, trashed = false, features, appFeatures, onSorting, onHandleError, openFolder }: Props) => {

    const infiniteFiles = useFileList(appId, { meta: { order: order, trashed: trashed } });
    const { isLoading, data, fetchNextPage, hasNextPage, isFetchingNextPage, remove: resetInfiniteFiles } = infiniteFiles;

    const [currentPreview, setCurrentPreview] = useState<number>();

    const openPreview = (previewId: number) => {
        setCurrentPreview(previewId);
    }

    const onClosePreview = () => {
        setCurrentPreview(undefined);
    }

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [fileToDelete, setFileToDelete] = useState<FileType | null>(null);

    const openModal = (file: FileType) => {
        setFileToDelete(file);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setFileToDelete(null);
    };

    const handleDeleteConfirm = () => {
        if (fileToDelete) {
            mutateFileDeleteForever.mutateAsync({ file: fileToDelete });
            closeModal();
        }
    };

    // Reset query when unmounted
    useEffect(() => () => resetInfiniteFiles(), []);

    const loadMoreRef = useInfiniteScroll(infiniteFiles, [view])

    const mutateFileRename = useMutateFileRename(["files", appId]);
    const mutateFileTrash = useMutateFileTrash(["files", appId]);
    const mutateFileDeleteForever = useMutateFileDeleteForever(["files", appId]);
    const mutateFileRestore = useMutateFileRestore(["files", appId]);
    const mutateFileSubscribe = useMutateFileSubscribe(["files", appId])
    const mutateFileUnsubscribe = useMutateFileUnsubscribe(["files", appId])

    if (isLoading) {
        return (
            <Spinner.UI spin={true} overlay={true} />
        )
    }

    let loadMoreButton = <Button.UI onClick={() => fetchNextPage()} disabled={!hasNextPage || isFetchingNextPage} className="wy-message-readmore">Load more</Button.UI>;

    if (view == "grid") {
        return (
            <>

                <div className="wy-grid wy-pane-group">
                    {data && data.pages && data.pages.map((group: any, i: number) => {
                        return <React.Fragment key={i}>
                            {
                                group.data?.map((file: FileType) => {

                                    return <FileItem.Card
                                        key={'file-card' + file.id}
                                        file={file}
                                        onClick={(e: any) => {
                                            if (file.metadata && file.metadata.type === 'folder' && !file.is_trashed) {
                                                openFolder(e.target.innerText)
                                            } else if (!file.is_trashed) {
                                                openPreview(file.id)
                                            }
                                        }}
                                        onRename={(name: string) => mutateFileRename.mutateAsync({ file: file, name: name })}
                                        onSubscribe={(file: FileType) => mutateFileSubscribe.mutateAsync({ file: file })}
                                        onUnsubscribe={(file: FileType) => mutateFileUnsubscribe.mutateAsync({ file: file })}
                                        onTrash={(file: FileType) => mutateFileTrash.mutateAsync({ file: file })}
                                        onRestore={(file: FileType) => mutateFileRestore.mutateAsync({ file: file })}

                                        onDeleteForever={(file: FileType) => {
                                            if (file.metadata && file.metadata.type === 'folder') {
                                                openModal(file)
                                            } else {
                                                mutateFileDeleteForever.mutateAsync({ file: file });
                                            }
                                        }}

                                        onHandleError={onHandleError}
                                        features={features}
                                        appFeatures={appFeatures}
                                    />

                                })
                            }
                        </React.Fragment>
                    })}
                    <Modal
                        isOpen={modalIsOpen}
                        onRequestClose={closeModal}
                        contentLabel="Delete Confirmation"
                        className="files-modal"
                        overlayClassName="files-modal-overlay"
                    >
                        <h2>Delete Confirmation</h2>
                        <p>Are you sure you want to delete this folder and all of its contents?</p>
                        <div className="filelist-button-container">
                            <button onClick={handleDeleteConfirm} className="filelist-delete-button">Delete</button>
                            <button onClick={closeModal} className="filelist-cancel-button">Cancel</button>
                        </div>
                    </Modal>
                    <div className="wy-pager" ref={loadMoreRef}>
                        {isFetchingNextPage
                            ? 'Loading more...'
                            : hasNextPage
                                ? loadMoreButton
                                : ""}
                    </div>
                </div>
                <PreviewFiles appId={appId} infiniteFiles={infiniteFiles} previewId={currentPreview} onClose={onClosePreview} features={features} appFeatures={appFeatures} />
            </>
        );
    }

    const headers: ({ by: FileOrderBy | undefined, title: string })[] = [
        { by: "name", title: "Name" },
        { by: "modified_at", title: "Modified" },
        { by: undefined, title: "Kind" },
        { by: "size", title: "Size" }
    ]

    return (
        <>
            <table className="wy-table wy-table-hover wy-table-files">
                <thead>
                    <tr>
                        <th className="wy-table-cell-icon"></th>
                        {headers.map((header) => {
                            let active = header.by === order?.by;
                            let onHeaderClick = (e: any) => {
                                e.preventDefault();
                                header.by && onSorting && onSorting({ by: header.by, descending: active && !order?.descending });
                            }
                            return <th key={"files-header" + header.title}>{header.by ?
                                <div className={"wy-table-sort-link"} onClick={onHeaderClick}>{header.title} {active && <Icon.UI name={order?.descending ? "menu-down" : "menu-up"} />}</div>
                                :
                                <>{header.title}</>
                            }</th>
                        })}
                        <th className="wy-table-cell-icon"></th>
                    </tr>
                </thead>
                <tbody>
                    {data && data.pages && data.pages.map((group: any, i: number) => {
                        return <React.Fragment key={i}>
                            {
                                group.data?.map((file: FileType) => {

                                    return <FileItem.Row
                                        key={'file-row' + file.id}
                                        file={file}
                                        onClick={(e: any) => {
                                            if (file.metadata && file.metadata.type === 'folder' && !file.is_trashed) {
                                                openFolder(e.target.innerText)
                                            } else if (!file.is_trashed) {
                                                openPreview(file.id)
                                            }
                                        }}

                                        onRename={(name: string) => mutateFileRename.mutateAsync({ file: file, name: name })}
                                        onSubscribe={(file: FileType) => mutateFileSubscribe.mutateAsync({ file: file })}
                                        onUnsubscribe={(file: FileType) => mutateFileUnsubscribe.mutateAsync({ file: file })}
                                        onTrash={(file: FileType) => mutateFileTrash.mutateAsync({ file: file })}
                                        onRestore={(file: FileType) => mutateFileRestore.mutateAsync({ file: file })}


                                        onDeleteForever={(file: FileType) => {
                                            if (file.metadata && file.metadata.type === 'folder') {
                                                openModal(file)
                                            } else {
                                                mutateFileDeleteForever.mutateAsync({ file: file });
                                            }
                                        }}

                                        onHandleError={onHandleError}
                                        features={features}
                                        appFeatures={appFeatures}
                                    />
                                })
                            }
                        </React.Fragment>
                    })}


                    <tr className="wy-pager" ref={loadMoreRef}>
                        <td colSpan={6}>
                            {isFetchingNextPage
                                ? 'Loading more...'
                                : hasNextPage
                                    ? loadMoreButton
                                    : ""}
                        </td>
                    </tr>

                </tbody>
            </table>
            <Modal isOpen={modalIsOpen} onRequestClose={closeModal} contentLabel="Delete Confirmation" style={{ overlay: { zIndex: 1000 }, content: { width: '50%', height: '50%', margin: 'auto' } }} >
                <h2>Delete Confirmation</h2>
                <p>Are you sure you want to delete this folder and all of it's contents?</p>
                <div className="filelist-button-container">
                    <button onClick={handleDeleteConfirm} className="filelist-delete-button">Delete</button>
                    <button onClick={closeModal} className="filelist-cancel-button">Cancel</button>
                </div>
            </Modal>
            <PreviewFiles appId={appId} infiniteFiles={infiniteFiles} previewId={currentPreview} onClose={onClosePreview} features={features} appFeatures={appFeatures} />
        </>
    )
}

export default FileList;