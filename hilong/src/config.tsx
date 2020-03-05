export enum tagStatusText {
    success = 0,
    info = 1,
    warning = 2,
    danger = 3 
}
export const options = [
    {
      value: '0',
      label: '已完成'
    },
    {
      value: '1',
      label: '已删除'
    },
    {
      value: '2',
      label: '待进行'
    },
    {
      value: '3',
      label: '进行中'
    }
]

export interface DetailData {
    id: number;
    date: string;
    name: string;
    status: number|string;
    describe: string;
}
export const tagText = ( status:number ) => {
    const result = ['已完成','已删除','待进行','进行中'];
    return result[status];
}
export const tagType = ( status:number ) => {
    return tagStatusText[status]
}