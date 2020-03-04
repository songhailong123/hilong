export enum tagStatusText {
    success = 0,
    info = 1,
    warning = 2,
    danger = 3 
}

export interface DetailData {
    id: number;
    date: string;
    name: string;
    status: number;
    describe: string;
}
export const tagText = ( status:number ) => {
    const result = ['已完成','已删除','待进行','进行中'];
    return result[status];
}
export const tagType = ( status:number ) => {
    return tagStatusText[status]
}