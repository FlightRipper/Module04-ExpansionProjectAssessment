// Exercise 1

// function bubbleSort(arr) {
//     for (let i = 0; i < arr.length; i++) {
//         for (let j = 0; j < arr.length - i; j++) {
//             if (arr[j] > arr[j + 1]) {
//                 let temp = arr[j];
//                 arr[j] = arr[j + 1];
//                 arr[j + 1] = temp;
//             }
//         }
//     }
//     return arr;
// }

// const array = bubbleSort([1,3,4,6,8,0,1,4])

// console.log(array)


//Exercise 2 

// function binarySearch(arr, x)
// {    
//     let l = 0;
//     let r = arr.length - 1;
//     let mid;
//     while (r >= l) {
//          mid = l + Math.floor((r - l) / 2);
//         if (arr[mid] == x)
//             return mid;
//         if (arr[mid] > x)
//             r = mid - 1;
//         else
//             l = mid + 1;
//     }
//     return -1;
// }
 
//     arr =new Array(2, 3, 4, 10, 40);
//     x = 10;
//     n = arr.length;
//     result = binarySearch(arr, x);
     
// (result == -1) ? console.log("Element is not present in array")
//                : console.log ("Element is present at index " + result);

// Exercise 3

// let array1=[]

// class Node {
//   constructor(data, next = null, prev = null) {
//     this.data = data;
//     this.next = next;
//     this.prev = prev;
//   }
// }

// class LinkedList {
//   constructor() {
//     this.head = null;
//     this.tail = null;
//     this.length = 0;
//   }

//   push(val) {
//     let node = new Node(val);
//     if (!this.head) {
//       // check if the list is empty to set the first node as head and tail
//       this.head = node;
//       this.tail = node;
//     } else {
//       let temp = this.tail;
//       this.tail = node;
//       node.prev = temp;
//       temp.next = node;
//     }
//     this.length++; // this is the nodes counter 
//     return this;
//   }

//   print() {
//     let current = this.head;
//     while (current) {
//       console.log(current.data);
//       current = current.next;
//     }
//   }

// }

// const ll = new LinkedList();

// ll.push(500);
// ll.push(300);
// ll.push(300);
// ll.push(500);

// ll.print();

// console.log("/////////////////");

// ll.print();

// console.log(array1)