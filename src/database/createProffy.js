module.exports = async function(db, { proffyValue, classValue, classScheduleValues }) {
    // Inserir dados na tabela de teachers
    const insertedProffy = await db.run(`
        insert into proffys(
            name,
            avatar,
            whatsapp,
            bio
        ) values(
            "${proffyValue.name}",
            "${proffyValue.avatar}",
            "${proffyValue.whatsapp}",
            "${proffyValue.bio}"
        );
    `);

    const proffy_id = insertedProffy.lastID;

    // Inserir dados na tabela classes

    const insertedClass = await db.run(`
        insert into classes(
            subject,
            cost,
            proffy_id
        ) values(
            "${classValue.subject}",
            "${classValue.cost}",
            "${proffy_id}"
        );
    `);

    const class_id = insertedClass.lastID;
    
    // Inserir dados na tabela classSchedules
    const insertedAllClassScheduleValues = classScheduleValues.map((classScheduleValue) => {
        return db.run(`
            insert into class_schedule(
                class_id,
                weekday,
                time_from,
                time_to
            ) values (
                "${class_id}",
                "${classScheduleValue.weekday}",
                "${classScheduleValue.time_from}",
                "${classScheduleValue.time_to}"
            );
        `);
    });

    // Aqui vou executar todos os db.runs() das class_schedule
    await Promise.all(insertedAllClassScheduleValues);
}