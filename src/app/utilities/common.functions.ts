export class CommonFunctions {
    chunk(arr: string[], size: number) {
        const newArr = [];
        for (let i=0; i<arr.length; i+=size) {
            newArr.push(arr.slice(i, i+size));
        }
        return newArr;
    }
}
