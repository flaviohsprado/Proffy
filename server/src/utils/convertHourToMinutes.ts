export default function convertHourToMinutes(time: string){
    //0:00
    //cria um array, dando um split no tempo e já convertendo em número
    //armazena o que vier em 2 variáveis
    const [hour, minutes] = time.split(':').map(Number)
    const timeInMinutes = (hour * 60) + minutes;

    return timeInMinutes;
}