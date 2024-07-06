import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ListAssets from './ListAssets';
import '../styles/home.css'

export default function Home(){
    return(
        <>  
            <body>

                <div id='nav-bar'>
                    <nav>
                        <ul>
                            <li><a href='/update-user'>Atualizar usuário</a></li>
                            <li><a href='/update-asset'>Atualizar asset</a></li>
                            <li><a href='/delete-user'>Excluir conta</a></li>
                        </ul>
                    </nav>
                </div>

                <div id="content">
                    <ListAssets/>
                </div>


            </body>
            <footer id='footer'>

                <div class="footer-info">
                    <p>Augusto Juiz Ribeiro - 2023004523</p>
                    <p>Erick De Alvarenga Bonifacio - 2023005736</p>
                    <p>Daniel Pires Domingueti - 2023005164</p>
                    <p>Adriano Maretti - 2024kkk</p>
                </div>
                <div id='git'>
                    <a href="https://github.com/Erick-Bonifacio/Final-Web-Project">GitHub</a>
                </div>
            </footer>
        </>
    )
}