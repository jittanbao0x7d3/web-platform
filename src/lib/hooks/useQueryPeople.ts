import { useQuery } from "@tanstack/react-query"
import { axiosInstance } from "@/lib/utils/axios"


export const useQueryPeople = (id: string | string[] | undefined) => {
    const url = `/people/${id}`

    return useQuery({
        queryKey: ['people', id],
        queryFn: async () => {
            const data = await axiosInstance.get(url)

            return data.data
        },
    })
}