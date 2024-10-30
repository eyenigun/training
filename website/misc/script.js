// document.write("This is a JS Code");


// JavaScript function to find the maximum number in an array


function findMaxNumber(arr) {
    if (arr.length === 0) {
        console.log("The array is empty.");
        return null;
    }
    
    let maxNumber = arr[0];
    
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] > maxNumber) {
            maxNumber = arr[i];
        }
    }
    
    return maxNumber;
}

// Example usage:
const numbers = [3, 5, 7, 2, 8, 10, 4];
const max = findMaxNumber(numbers);

console.log("The maximum number in the array is: " + max);
