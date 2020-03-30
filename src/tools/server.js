import axios from 'axios'
const baseUrl = 'http://localhost:5555'

export const checkBoxDuration = [
    {
      key: '0 sampai 5',
      name: [0, 5],
      label: '0 - 5',
    },
];
  
export const allData = async () => {
    try {
        const resp = await axios.get(baseUrl)
        return resp.data        
    } catch (error) {
        return 500
    }
} 