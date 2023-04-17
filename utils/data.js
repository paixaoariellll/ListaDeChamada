import bcrypt from "bcryptjs";

const data = {
  user: [
    {
      registerId: "0000000",
      name: "Professor",
      email: "prof@gmail.com",
      password: bcrypt.hashSync("Fatec2023!"),
      isTeacher: true,
    },
    {
      registerId: "2011085",
      name: "Aluno 1",
      email: "aluno1@gmail.com",
      password: bcrypt.hashSync("Fatec2023!"),
      isTeacher: false,
    },
    {
      registerId: "2111021",
      name: "Aluno 2",
      email: "aluno2@gmail.com",
      password: bcrypt.hashSync("Fatec2023!"),
      isTeacher: false,
    },
  ],
  clas: [
    {
      createdBy: "Prof. Dr. Jhonson",
      className: "Gestão e Governança",
      startHour: "13:00",
      endHour: "15:00",
      keyWords: bcrypt.hashSync("Programação"),
      time: 165,
      team: ["ADS", "GCOM"],
      group: ["6"],
    },
    {
      createdBy: "Prof. Dr. Bruno",
      className: "Banco de Dados",
      startHour: "13:00",
      endHour: "15:00",
      keyWords: bcrypt.hashSync("SQL"),
      time: 165,
      team: ["ADS", "GTI"],
      group: ["3","4"]
    },
  ],
  teacher: [
    {
      teacherId: "61564e0c5a5f5c5c527dc5b0",
      subject: 'Linguagem de Programação',
      gradeClass: '1º Semestre',
      gradeClassQuantify: '21',
    },
    {
      teacherId: "61564e0c5a5f5c5c527dc5b3",
      subject: 'Estrutura de Dados',
      gradeClass: '6º Semestre',
      gradeClassQuantify: '20',
    }
  ],
  student: [
    {
      studentId: "61564e0c5a5f5c5c527dc5b0",
      subject: "Estrutura de Dados",
      numClassTotal: "61564e0c5a5f5c5c527dc5b0",
      totalPresences: 8
    },
    {
      studentId: "61564e0c5a5f5c5c527dc5b4",
      subject: "Linguagem de Programação",
      numClassTotal: "61564e0c5a5f5c5c527dc5b0",
      totalPresences: 8
    }
  ],
  Presence: [
    {
      studentId: "61564e0c5a5f5c5c527dc5b5",
      classId: "61564e0c5a5f5c5c527dc5b8",
      numRigthSteps: 3,
      numClassTotal: 10,
      totalPresence: 8
    },
    {
      studentId: "61564e0c5a5f5c5c527dc5b6",
      classId: "61564e0c5a5f5c5c527dc5b8",
      numRigthSteps: 4,
      numClassTotal: 5,
      totalPresence: 4
    }
  ]


}

export default data;