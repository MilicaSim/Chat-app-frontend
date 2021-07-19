import axios from "./axios";

class ChatService {

    sendMessage = (params = {}) => {
        return axios.post('chat', params);
    }

    getOneMessage = (id: string) => {
        return axios.get('chat/' + id);
    }

    getAll = () => {
        return axios.get('chat');
    }

    getAllWithUser = (id: string, page: number) => {
        return axios.get('chat/messages', {params: {
            id: id,
            page: page,
            pageSize: 14
        }});
    }

    updateMessage = (id: string, params = {}) => {
        return axios.put('chat/' + id, {params});
    }

    updateMessageSeenOn = (userId: string) =>{
        return axios.post('chat/seen', {userId});
    }

    deleteMessage = (id: string) => {
        return axios.delete('chat/' + id);
    }
}

export default new ChatService();