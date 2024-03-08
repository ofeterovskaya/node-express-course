// Import the Promise versions of writeFile and readFile from the fs module
const { writeFile, readFile } = require("fs").promises;

const writer = async () => {
  try {
    // Write 'Hello  to temp.txt, overwriting any existing content
    await writeFile('./temporary/temp.txt', 'Hello \n', { flag: 'a' });
    // Append 'Nice to see you  to temp.txt
    await writeFile('./temporary/temp.txt', 'Nice to see you \n', { flag: 'a' });
    // Append 'Bye, see you again' to temp.txt
    await writeFile('./temporary/temp.txt', 'Bye, see you again', { flag: 'a' });
    
    console.log('Has been written successfully!');
  } catch (error) {
    
    console.log('An error occurred: ', error);
  }
}

// Define an async function called reader
const reader = async () => {
  try {
    // Read the contents of temp.txt as a UTF-8 string
    const data = await readFile('./temporary/temp.txt', 'utf8');

    console.log(data);
  } catch (error) {
    
    console.log('An error occurred: ', error);
  }
};

// Define an async function called readWrite
const readWrite = async () => {
  // Call writer and wait for it to finish
  await writer();
  // Then call reader and wait for it to finish
  await reader();
};

// Call readWrite to start the process
readWrite();