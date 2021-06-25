import React from 'react';

import { StatusBar } from 'expo-status-bar';
import { AppLoading } from 'expo'; //Tela de carregamento/Loading

import { Archivo_400Regular, Archivo_700Bold, useFonts } from '@expo-google-fonts/archivo'; //Importa s fontes
import { Poppins_400Regular, Poppins_600SemiBold } from '@expo-google-fonts/poppins';

import AppStack from './src/routes/AppStack';


//Função que retorna uma estrutura XML
export default function App() {
  let [fontsLoaded] = useFonts({
    Archivo_400Regular,
    Archivo_700Bold,
    Poppins_400Regular,
    Poppins_600SemiBold,
  });

  //Enquanto as fontes não estiverem carregadas, mostra o AppLoading
  if (!fontsLoaded) {
    return <AppLoading />;
  } else {

    return (
      //Fragmant: Cria uma tag mas a mesma não é passada no HTML final
      <>
        <AppStack />
        <StatusBar style="light" />
      </>
    );
  }
}
