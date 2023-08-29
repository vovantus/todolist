import { initializeApp } from 'firebase/app';
import { getFirestore, doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { SingleTask } from "./TodoList/TaskStructure";


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



// Firestore data converter
const taskConverter = {
  fromFirestore: (snapshot, options) => {
                                            const data = snapshot.data(options);
                                            return data.tasks.map( task => new SingleTask(task.text, task.open, task.id));
                                        }
};

const firestoreDocRef = doc(db, 'tasks', 'graWkmOGCx1NgHp2nyad').withConverter(taskConverter);



export const addFireTask = async (newTask) => {  
  await updateDoc(firestoreDocRef, {
    tasks: arrayUnion({
                        id: newTask.id,
                        text: newTask.text,
                        open: newTask.open
                      })
  });  
};


export const delFireTask = async (task) => {
  await updateDoc(firestoreDocRef, {
    tasks: arrayRemove(SingleTask.toFireObj(task))
  });

};

export const updateFireTasks =  async (tasks) => {
  await updateDoc(firestoreDocRef, { tasks: tasks.map(task => SingleTask.toFireObj(task)) });
}

export { db }
export { firestoreDocRef }


