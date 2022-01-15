### :gem: Kullanıcı Kayıt Uygulaması İsterleri: :gem: 
 
  - Kullanıcının adı, soyadı, kullanıcı adı ve şifre bilgileri alınacak. :heavy_check_mark:
  	- User model oluşturuldu.
  - Kullanıcılar register olacak, register olan kullanıcılar mongodb de tutulacak. :heavy_check_mark:
  - Kayıtlı olan kullanıcı login olabilecek. :heavy_check_mark:
  - Login olan kullanıcının login olduğu browser bilgisi sessionda tutulacak ve kullanıcıya jwt token return edilecek. :heavy_check_mark:
  - Kullanıcının authni hem jwt tokendan hemde sessiondan aynı browser üzerinden mi geldi diye kontrol edilecek. :heavy_check_mark:
  - Sonrasında yapmak istediği işlemler için bu kontrolleri geçmesi gerekecek. :heavy_check_mark:
  	- Login işleminden sonra home page açılarak sağlandı. 
  - Kullanıcılar listelenecek :heavy_check_mark:
  	- Açılan home page te kullanıcılar listelendi. 
<hr>

## :calling: About
A website where registered users can log in. In this application, registration and login processes were made using various verification methods like JWT, Session, Cookie.

## :gear: Technologies

- [HTML](https://www.w3schools.com/html/)
- [CSS](https://www.w3schools.com/css/)
- [Bootstrap](https://getbootstrap.com/docs/)
- [JavaScript](https://www.javascript.com/)
- [NodeJS](https://nodejs.org/en/)
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)

JWT, Session, Cookie were used for validation.<br/>
CSS and Bootstrap were used for styling.
<br/>

## :sparkles: Main Features

  - User information is taken and recorded in the database.
  - Re-registration with the same email or username is not allowed.
  - The user who is not logged in cannot view the user list.
  - User information is kept on JWT token and session and compared.

## :camera_flash: Screenshots

| Register | Login | 
| --- | --- |
| <img src="https://user-images.githubusercontent.com/24686636/149600366-5a7828e7-58ef-4125-94fd-ee754cfa6ef6.png"> | <img src="https://user-images.githubusercontent.com/24686636/149600374-165951d6-c1d4-4068-8235-e28650097575.png"> |

## :computer: Setup
  
  - To run the project, Git must be installed on your computer (or you can download zip file). You must install MongoDB on your computer. After completing this installation, we open the git terminal. We write the following expression `git clone https://github.com/Kodluyoruz-NodeJs-Bootcamp/week2-mehtapugur` and press the enter button. After opening the downloaded project in the code editor, we write this command `npm install` on the command line. And after that we write `npm start`. Then open `http://localhost:3000/` on your browser<br/><br/>
 

## :memo: License
This project is under the terms of the MIT license.
<br/>
<br/>
Contact: [LinkedIn](https://www.linkedin.com/in/mehtapugur)
