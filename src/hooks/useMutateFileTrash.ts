import { useContext } from "react";
import { MutationKey, useMutation, useQueryClient } from "react-query";
import { WeavyContext } from "../contexts/WeavyContext";
import { FileType, ServerErrorResponse } from "../types/types";
import { removeCacheItem, updateCacheItem } from "../utils/cacheUtils";

export function useMutateFileTrash(filesKey: MutationKey) {

    const { client } = useContext(WeavyContext);
    const queryClient = useQueryClient();

    if (!client) {
        throw new Error('useMutateFileTrash must be used within an WeavyProvider');
    }

    type MutateProps = {
        file: FileType
    }

    const trashMutation = useMutation(async ({ file }: MutateProps) => {
        if (file.id >= 1) {
            const response = await client.post("/api/files/" + file.id + "/trash", "POST", "");
            return response.json();
        } else {
            throw new Error(`Could not trash ${file.name}.`);
        }
    }, {
        onMutate: async (variables: MutateProps) => {
            updateCacheItem(queryClient, filesKey, variables.file.id, (existingFile: FileType) => Object.assign(existingFile, { is_trashed: true, status: "pending" }));
        },
        onSuccess: (data: FileType, variables: MutateProps, context: any) => {
            updateCacheItem(queryClient, filesKey, variables.file.id, (existingFile: FileType) => Object.assign(existingFile, data, { status: "ok" }));
        },
        onError(error: any, variables: MutateProps, context: any) {
            updateCacheItem(queryClient, filesKey, variables.file.id, (existingFile: FileType) => Object.assign(existingFile, { is_trashed: false, status: "error" }));
        },
    });

    return trashMutation;
}

export function useMutateFileRestore(filesKey: MutationKey) {

    const { client } = useContext(WeavyContext);
    const queryClient = useQueryClient();

    if (!client) {
        throw new Error('useMutateFileRestore must be used within an WeavyProvider');
    }

    type MutateProps = {
        file: FileType
    }

    const restoreMutation = useMutation(async ({ file }: MutateProps) => {
        if (file.id >= 1) {
            const response = await client.post("/api/files/" + file.id + "/restore", "POST", "");
            if (!response.ok) {
                throw <ServerErrorResponse>await response.json();
            }
            return response.json();
        } else {
            throw <ServerErrorResponse>{ status: 400, title: `Could not restore ${file.name}.` };
        }
    }, {
        onMutate: async (variables: MutateProps) => {
            updateCacheItem(queryClient, filesKey, variables.file.id, (existingFile: FileType) => Object.assign(existingFile, { is_trashed: false }));
        },
        onSuccess: (data: FileType, variables: MutateProps, context: any) => {
            updateCacheItem(queryClient, filesKey, variables.file.id, (existingFile: FileType) => Object.assign(existingFile, data, { status: "ok" }));
        },
        onError(error: any, variables: MutateProps, context: any) {
            updateCacheItem(queryClient, filesKey, variables.file.id, (existingFile: FileType) => Object.assign(existingFile, { is_trashed: true }));
        },
    });

    return restoreMutation;
}

export function useMutateFileDeleteForever(filesKey: MutationKey) {

    const { client } = useContext(WeavyContext);
    const queryClient = useQueryClient();

    if (!client) {
        throw new Error('useMutateFileDeleteForever must be used within an WeavyProvider');
    }

    type MutateProps = {
        file: FileType
    }

    const deleteForeverMutation = useMutation(async ({ file }: MutateProps) => {

        console.log(file)

        // // ##########
        // if (file.metadata && file.metadata.type === 'folder') {
        //     // delete main folder app itself
        //     const ress = await fetch(`https://f55a3cc1035a4031b8b0e57ae18814ee.weavy.io/api/apps/${file.metadata.child_app_id}`, {
        //         method: 'DELETE',
        //         headers: {
        //             'Authorization': `Bearer wys_oP6CJGJJ7hyYqcy5A56CPCwDaMToaM4M2VCP`
        //         },
        //     })

        //     // grab all tagged with main folder app ID and delete
        //     const res = await fetch(`https://f55a3cc1035a4031b8b0e57ae18814ee.weavy.io/api/apps?tag=${file.metadata.child_app_id}`, {
        //         method: 'GET',
        //         headers: {
        //             'Authorization': `Bearer wys_oP6CJGJJ7hyYqcy5A56CPCwDaMToaM4M2VCP`,
        //             'Content-Type': 'application/json',
        //         },
        //     })
        //     const data = await res.json()
        //     const associated = data.data
        //     associated?.forEach(app => {
        //         const temp = fetch(`https://f55a3cc1035a4031b8b0e57ae18814ee.weavy.io/api/apps/${app.id}`, {
        //             method: 'DELETE',
        //             headers: {
        //                 'Authorization': `Bearer wys_oP6CJGJJ7hyYqcy5A56CPCwDaMToaM4M2VCP`,
        //             },
        //         })
        //     })

        // }
        // // ##########


        // if (file.id >= 1 && file.is_trashed) {
        //     const response = await client.post("/api/files/" + file.id, "DELETE", "");
        //     if (!response.ok) {
        //         throw <ServerErrorResponse>await response.json();
        //     }
        // } else {
        //     throw <ServerErrorResponse>{ status: 400, title: `Could not delete ${file.name} forever.` };
        // }
    }, {
        onMutate: async (variables: MutateProps) => {
            updateCacheItem(queryClient, filesKey, variables.file.id, (existingFile: FileType) => Object.assign(existingFile, { status: "pending" }));
        },
        onSuccess: (data: any, variables: any, context: any) => {
            removeCacheItem(queryClient, filesKey, variables.file.id);
        },
        onError(error, variables, context) {
            // Show in error list instead?
            updateCacheItem(queryClient, filesKey, variables.file.id, (existingFile: FileType) => Object.assign(existingFile, { status: undefined }));
        },
    });

    return deleteForeverMutation;
}