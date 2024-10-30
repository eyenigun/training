function addNumbers() {
    // Get the values from the input fields
    const num1 = document.getElementById('number1').value;
    const num2 = document.getElementById('number2').value;

    // Convert the input values to numbers
    const number1 = parseFloat(num1);
    const number2 = parseFloat(num2);

    // Check if the inputs are valid numbers
    if (isNaN(number1) || isNaN(number2)) {
        alert("Please enter valid numbers!");
        return;
    }

    // Add the numbers
    const sum = number1 + number2;

    // Display the result
    document.getElementById('result').innerText = "Result: " + sum;
}