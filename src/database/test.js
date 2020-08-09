const database = require('./db');
const createProffy = require('./createProffy');

database.then( async(db) => {

    //Inserir dados
    proffyValue = { 
        name: 'Luis Henrique',
        avatar: 'https://avatars2.githubusercontent.com/u/65178969?s=460&u=0e2d24bc08004372aa4a6604d2dcb2678c309c0b&v=4',
        whatsapp: '99992077288',
        bio: 'Entusiasta das melhores tecnologias de química avançada. Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões.'
    }

    classValue = {
        subject: 5,
        cost: '20'
        //O proffy id virá pelo banco de dados
    }

    classScheduleValues = [
        //class_id virá pelo banco de dados após cadastrar a aula
        {
            weekday: 1,
            time_from: 728,
            time_to: 1285
        },
        {
            weekday: 0,
            time_from: 528,
            time_to: 1285
        }
    ]

    //await createProffy(db, { proffyValue, classValue, classScheduleValues });

    //Consultar dados

    //Todos os proffys
    const selectedProffys = await db.all('select * from proffys');
    //console.log(selectedProffys)

    //Consultar as classes de um determinado professor
    //e trazer junto os dados do professor
    const selectedClassesAndProffys = await db.all(`
        select classes.*, proffys.*
        from proffys
        join classes on (classes.proffy_id = proffys.id)
        where classes.proffy_id = 1;
    `)
    //console.log(selectedClassesAndProffys)

    // O horario que a pessoa trabalho, por exemplo, é das 8h até as 18h
    // O horário do time_from  (8h) precisa ser antes ou igual ao horário solicitado
    // O time_to precisa ser acima

    const selectedClassSchedule = await db.all(`
        select class_schedule.* 
        from class_schedule 
        where class_schedule.class_id = "1"
        and class_schedule.weekday = "0"
        and class_schedule.time_from <= "420"
        and class_schedule.time_to > "528"
    `);
    //console.log(selectedClassSchedule);
} );