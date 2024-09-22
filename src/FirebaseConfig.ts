// src/firebaseConfig.ts
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// Suas credenciais de configuração do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBiQD2xBv9Ul6eYN_scDnAtUqNvgaFjCro",
    authDomain: "projeto-orcamento-pessoal.firebaseapp.com",
    projectId: "projeto-orcamento-pessoal",
    storageBucket: "projeto-orcamento-pessoal.appspot.com",
    messagingSenderId: "633437049853",
    appId: "1:633437049853:web:383f59826fe53b22303f94",
    measurementId: "G-EVSRH0KEJH"
};

// Inicializando o Firebase
const app = initializeApp(firebaseConfig);

// Autenticação e provedor do Google
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };
