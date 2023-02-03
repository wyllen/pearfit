import { faker } from '@faker-js/faker';
import type {
  Answer,
  Candidate,
  Organisation,
  Question,
  Quiz,
  Role,
  RoleLevel,
  User,
  UserOrganisation,
} from '@prisma/client';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const seedCandidates = async () => {
  await prisma.candidate.deleteMany({});
  const amountOfCandidates = 5;
  const roles = await prisma.role.findMany();

  const candidates: Candidate[] = [];
  roles.forEach((role) => {
    for (let i = 0; i < amountOfCandidates; i++) {
      candidates.push({
        id: faker.datatype.uuid(),
        name: `${faker.name.firstName()} ${faker.name.lastName()}`,
        linkedinUrl: faker.internet.url(),
        organisationId: role.organisationId,
        roleId: role.id,
      });
    }
  });

  return prisma.candidate.createMany({ data: candidates });
};

const seedRoles = async () => {
  await prisma.role.deleteMany({});
  const amountOfRoles = 3;
  const organisations = await prisma.organisation.findMany();

  const roles: Role[] = [];
  organisations.forEach((organisation) => {
    for (let i = 0; i < amountOfRoles; i++) {
      roles.push({
        id: faker.datatype.uuid(),
        name: faker.name.jobTitle(),
        organisationId: organisation.id,
      });
    }
  });

  return prisma.role.createMany({ data: roles });
};

const seedRolesLevels = async () => {
  await prisma.roleLevel.deleteMany({});
  const levels = ['Junior', 'Mid', 'Senior'];
  const roles = await prisma.role.findMany();

  const roleLevels: RoleLevel[] = [];
  roles.forEach((role) => {
    levels.forEach((level, key) => {
      roleLevels.push({
        id: faker.datatype.uuid(),
        name: level,
        level: key + 1,
        roleId: role.id,
      });
    });
  });

  return prisma.roleLevel.createMany({ data: roleLevels });
};

const seedQuizzes = async () => {
  await prisma.quiz.deleteMany({});
  const roles = await prisma.role.findMany();

  const quizzes: Quiz[] = [];
  roles.forEach((role) => {
    quizzes.push({
      id: faker.datatype.uuid(),
      name: role.name,
      organisationId: role.organisationId,
      roleId: role.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  });

  return prisma.quiz.createMany({ data: quizzes });
};

const seedQuestions = async () => {
  await prisma.question.deleteMany({});
  const quizzes = await prisma.quiz.findMany();
  const amountOfQuestion = 10;
  const questions: Question[] = [];
  quizzes.forEach((quiz) => {
    for (let i = 0; i < amountOfQuestion; i++) {
      questions.push({
        id: faker.datatype.uuid(),
        title: faker.lorem.sentence().replace('.', '?'),
        order: i,
        quizId: quiz.id,
      });
    }
  });

  return prisma.question.createMany({ data: questions });
};

const seedAnswers = async () => {
  await prisma.answer.deleteMany({});
  const questions = await prisma.question.findMany();
  const amountOfAnswer = 4;

  const answers: Answer[] = [];
  questions.forEach((question) => {
    for (let i = 0; i < amountOfAnswer; i++) {
      answers.push({
        id: faker.datatype.uuid(),
        title: faker.lorem.sentence(4),
        questionId: question.id,
        goodAnwser: i === 3,
        order: i,
      });
    }
  });

  return prisma.answer.createMany({ data: answers });
};

const seedOrganisations = async () => {
  await prisma.organisation.deleteMany({});
  const amountOfOrganisation = 3;

  const organisations: Organisation[] = [];
  for (let i = 0; i < amountOfOrganisation; i++) {
    organisations.push({
      id: faker.datatype.uuid(),
      name: faker.company.name(),
      contactEmail: faker.internet.email(),
      address: faker.address.streetAddress(),
      postalCode: parseInt(faker.address.zipCode()),
      city: faker.address.city(),
      country: faker.address.country(),
    });
  }
  return prisma.organisation.createMany({ data: organisations });
};

const seedUsers = async () => {
  const userEmailToNotDelete = [
    'wyllen44@gmail.com',
    'vincent.durand@hublo.com',
  ];
  // get all user id with emails (wyllen44@gmail.com, vincent.durand@hublo.com)
  const usersToNotDeleted = await prisma.user.findMany({
    where: {
      email: {
        in: userEmailToNotDelete,
      },
    },
  });
  const userIdToNotDelete = usersToNotDeleted.map((user) => user.id);

  // delete all userOrganisation with user id
  await prisma.userOrganisation.deleteMany({});

  await prisma.session.deleteMany({
    where: {
      userId: {
        notIn: userIdToNotDelete,
      },
    },
  });

  // delete all users but not this emails (wyllen44@gmail.com, vincent.durand@hublo.com)
  await prisma.user.deleteMany({
    where: {
      email: {
        notIn: userEmailToNotDelete,
      },
    },
  });

  const amountOfUsers = 3;

  const organisations = await prisma.organisation.findMany();
  const users: User[] = [];
  //   {
  //     id: string;
  //     userId: string | null;
  //     organisationId: string | null;
  // }
  const userOrganisation: UserOrganisation[] = [];

  organisations.forEach((organisation) => {
    for (let i = 0; i < amountOfUsers; i++) {
      const userId = faker.datatype.uuid();
      users.push({
        id: userId,
        name: faker.name.firstName(),
        email: faker.internet.email(),
        emailVerified: new Date(),
        image: faker.image.avatar(),
      });
      userOrganisation.push({
        id: faker.datatype.uuid(),
        userId,
        organisationId: organisation.id,
      });
    }
    usersToNotDeleted.forEach((user) => {
      userOrganisation.push({
        id: faker.datatype.uuid(),
        userId: user.id,
        organisationId: organisation.id,
      });
    });
  });

  await prisma.user.createMany({ data: users });

  return prisma.userOrganisation.createMany({ data: userOrganisation });
};

async function main() {
  await seedOrganisations();
  await seedRoles();
  await seedRolesLevels();
  await seedQuizzes();
  await seedQuestions();
  await seedAnswers();
  await seedCandidates();
  await seedUsers();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
