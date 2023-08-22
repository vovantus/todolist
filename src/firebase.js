import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDEmhwacQlSHwvkQbAHSyXWdDWx51BpWUM",
    authDomain: "todolist-ad900.firebaseapp.com",
    projectId: "todolist-ad900",
    storageBucket: "todolist-ad900.appspot.com",
    messagingSenderId: "130409173653",
    appId: "1:130409173653:web:c230dd9aae3fa0a99a819c"
  };


const fireApp = initializeApp(firebaseConfig);
const db = getFirestore(fireApp);
const auth = getAuth(fireApp);

//   const [fireTasks, setFireTasks] = useState([]);

//   const addFireTask = async (text,sort) => {
//     try {
//       const docRef = await addDoc(collection(db, "tasks"), {
//         text: text,
//         open: true,
//         id: sort,
//       });
//       console.log("Document written with ID: ", docRef.id);
//     } catch (error) {
//       console.error("Error adding document: ", error);
//     }
//   };

//   useEffect(() => {
//     // This function fetches tasks from Firestore
//     const fetchTasks = async () => {
//         const tasksCol = collection(db, 'tasks');
//         const taskSnapshot = await getDocs(tasksCol);
//         const taskList = taskSnapshot.docs.map(doc => ({
//             id: doc.id,
//             ...doc.data()
//         }));
//         setFireTasks(taskList);
//     };

//     fetchTasks();
// }, []);

//  console.log(fireTasks);


export { db, fireApp, auth };
