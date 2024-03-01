const array2D = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];

function sum2DArray(arr) {
    return new Promise((resolve, reject) => {
        console.log('Sum called ... ');
        if (Array.isArray(arr)) {
            setTimeout(() => {
                let sum = 0;
                for (let i = 0; i < arr.length; i++) {
                    for (let j = 0; j < arr[i].length; j++) {
                        if (arr[i][j] < 0) {
                            console.log('rejecting ... ');
                            reject('BAD INPUT: Negative number found');
                            return;
                        }
                        sum += arr[i][j];
                    }
                }
                console.log('resolving ... ');
                resolve(sum);
            }, 0);
        }
        else {
            console.log('rejecting ... ');
            reject('BAD INPUT: Expected array as input');
        }
        console.log('returning from sum');
    });
}

async function sum2DArrayAsync(arr) {
    const rowSumPromises = [];
    for (let i = 0; i < arr.length; i++) {
        rowSumPromises.push(sum2DArray(arr[i]));
    }
    try {
        const results = await Promise.all(rowSumPromises);
        let sum = 0;
        for (let i = 0; i < results.length; i++) {
            sum += results[i];
        }
        console.log(`Sum of 2D array: ${sum}`);
        return 'done'
    }
    catch (error) {
        console.log(`Error: ${error}`);
        return 'failed'
    }
}