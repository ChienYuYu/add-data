const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
const fileupload = require("express-fileupload");
const { ref, uploadBytes, uploadBytesResumable, getDownloadURL, deleteObject } = require('firebase/storage')
const { storage, db } = require('./firebase.js')
const { addDoc, collection, setDoc, doc, getDocs, deleteDoc, updateDoc } = require('firebase/firestore');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(fileupload());

app.get('/', (req, res) => {
  res.send('hello~~~~')
})

// 上傳圖片
app.post('/uploadImg', (req, res) => {
  const file = req.files.yourUpload.data;
  const name = req.files.yourUpload.name;
  const storageRef = ref(storage, 'productUpload-bulb/' + name);
  const uploadTask = uploadBytesResumable(storageRef, file);

  uploadTask.on('state_changed',
    (snapshot) => {
      // Observe state change events such as progress, pause, and resume
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      switch (snapshot.state) {
        case 'paused':
          console.log('Upload is paused');
          break;
        case 'running':
          console.log('Upload is running');
          break;
      }
    },
    (error) => {
      // Handle unsuccessful uploads
    },
    () => {
      // Handle successful uploads on complete
      // For instance, get the download URL: https://firebasestorage.googleapis.com/...
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        console.log('File available at', downloadURL);
        res.send({ msg: '上傳成功', url: downloadURL })
      });
    }
  );
})

// 刪除圖片
// 參考文件 https://firebase.google.com/docs/storage/web/delete-files?hl=zh&authuser=3
app.delete('/uploadImg/:fileName', (req, res) => {
  // Create a reference to the file to delete
  const fileName = req.params.fileName
  const desertRef = ref(storage, `productUpload-bulb/${fileName}`);
  // Delete the file
  deleteObject(desertRef).then(() => {
    // File deleted successfully
    res.send({ msg: '已取消作業 並刪除上傳圖片' })
  }).catch((error) => {
    // Uh-oh, an error occurred!
    res.send({ msg: '發生錯誤...似乎有些問題' + error })
  });
})

// 存入資料庫
// 參閱文件網址 Web verson9 寫法
// https://firebase.google.com/docs/firestore/manage-data/add-data?hl=zh-tw
app.post('/addData', async (req, res) => {
  const { title, category, price, inventory, pic } = req.body;
  try {
    const docRef = await addDoc(collection(db, 'products'), {})  // 先寫入空內容 讓 Firebase自動產生id
    console.log("Document written with ID: ", docRef.id);
    await setDoc(docRef, { // 把上面產生的id跟前端內容寫入資料庫
      title,
      category,
      price,
      inventory,
      pic,
      id: docRef.id,
      selling: false,
      addTime: new Date().getTime(),
    })
    res.send({ msg: '新增成功' })
  } catch (e) {
    res.status(500).send({ msg: '似乎有些問題' });
  }
})

// 取得資料
// https://firebase.google.com/docs/firestore/query-data/get-data?hl=zh-tw#web-version-9_7
// 參閱文件網址 Web verson9 寫法
app.get('/products', async (req, res) => {
  try {
    const tempArr = [];
    const querySnapshot = await getDocs(collection(db, "products"));
    querySnapshot.forEach((doc) => {
      // console.log(doc.id, " => ", doc.data());
      tempArr.push(doc.data())
    });
    res.send({ msg: '取得資料', products: tempArr })
  } catch (error) {
    res.status(500).send({ msg: '似乎有些問題' });
  }
})

//刪除資料
app.delete('/products/:id', async (req, res) => {
  try {
    const id = req.params.id;
    await deleteDoc(doc(db, "products", id));
    res.send({ msg: '刪除成功' })
  } catch (error) {
    res.status(500).send({ msg: '似乎有些問題' });
  }
})

// 編輯資料
app.put('/products/:id', async(req, res) => {
  try {
    const id = req.params.id;
    const { title, category, price, inventory, pic } = req.body;
    const productRef = doc(db, "products", id);
    await updateDoc(productRef, {
      title,
      category,
      price,
      inventory,
      pic
    });
    res.send({ msg: '更新成功' })
  } catch (error) {
    res.status(500).send({ msg: '似乎有些問題' });
  }
})

// 上下架狀態
app.patch('/products/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const { tf } = req.body;
    const productRef = doc(db, "products", id);
    await updateDoc(productRef, {
      selling: tf
    });
    res.send({ msg: '上架狀態已更改', selling: tf})
  } catch (error) {
    res.status(500).send({ msg: '似乎有些問題' });
  }
})

app.listen(port, () => {
  console.log(`伺服器正在聆聽 ${port} port...`);
})