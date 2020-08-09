const Database = require('./database/db');
const { subjects, weekdays, getSubject, convertHoursToTime } = require('./utils/format');

function pageLanding(req, res){
    return res.render('index.html');
}

async function pageStudy(req, res){
    const filters = req.query;

    if(!filters.subject || !filters.weekday || !filters.time){
        
        return res.render('study.html', { filters, subjects, weekdays });
    }

        // converter horas em minutos
        const timeToMinutes = convertHoursToTime(filters.time);

        const query = `
            select classes.*, proffys.*
            from proffys
            join classes on (classes.proffy_id = proffys.id)
            where exists(
                select class_schedule.* 
                from class_schedule 
                where class_schedule.class_id = classes.id
                and class_schedule.weekday = ${filters.weekday}
                and class_schedule.time_from <= ${timeToMinutes}
                and class_schedule.time_to > ${timeToMinutes}
            )
            and classes.subject = "${filters.subject}"
        `

        //caso haja erro na hora da consulta do banco de dados.
        try {
            const db = await Database;
            const proffys = await db.all(query);

            proffys.map((proffy) => {
                proffy.subject = getSubject(proffy.subject)
            })

            return res.render('study.html', { proffys, subjects, filters, weekdays })

        } catch (error) {
            console.log(error);
        }
}

function pageGiveClasses(req, res){

    return res.render('give-classes.html', { weekdays, subjects })

}

async function saveClasses(req, res){
    const createProffy = require('./database/createProffy')

    const proffyValue = {
        name: req.body.name,
        avatar: req.body.avatar,
        whatsapp: req.body.whatsapp,
        bio: req.body.bio
    }

    const classValue = {
        subject: req.body.subject,
        cost: req.body.cost
    }

    const classScheduleValues = req.body.weekday.map((weekday, index) => {
        
        return {
            weekday,
            time_from: convertHoursToTime(req.body.time_from[index]),
            time_to: convertHoursToTime(req.body.time_to[index])
        };

    })

    try {
        const db = await Database
        await createProffy(db, { proffyValue, classValue, classScheduleValues })
        
        let queryString  = '?subject=' + req.body.subject
        queryString += '&weekday=' + req.body.weekday[0]
        queryString += '&time=' + req.body.time_from[0]

        return res.redirect('/study' + queryString);
    } catch (error) {
        console.log(error)
    }

}

module.exports = {
    pageLanding,
    pageStudy,
    pageGiveClasses,
    saveClasses
}