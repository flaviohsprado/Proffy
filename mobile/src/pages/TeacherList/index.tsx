import React from 'react';
import { View } from 'react-native';

import Styles from './styles';

import PageHeader from '../../components/PageHeader';

function TeacherList(){
    return (
        <View style={Styles.container}>
            <PageHeader title="Proffys Disponíveis"/>
        </View>
    );    
}

export default TeacherList;