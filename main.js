class ITSchool {
    availableCourses = [];
    startedLearningGroups = [];

    constructor(name, description, maxGroupCount, maxStudentsCountPerGroup) {
        this.name = name;
        this.description = description;
        this.maxGroupCount = maxGroupCount;
        this.maxStudentsCountPerGroup = maxStudentsCountPerGroup;
    }

    registerCourse(courseName, totalLessons, availableTeachersAmount) {
        if (this.availableCourses.some((course) => course.name === courseName)) {
            return `Course ${courseName} already exists.`;
        }

        this.availableCourses.push(new Course(courseName, totalLessons, availableTeachersAmount))
    }

    startLearningGroup(courseName, teacherName, amountOfStudents) {
        const courseForNewLearningGroup = this.availableCourses.find((course) => (course.name === courseName) && (course.availableTeachersAmount))
        if (courseForNewLearningGroup) {
            this.startedLearningGroups.push(new LearningGroup(courseName, teacherName, amountOfStudents));
            courseForNewLearningGroup.availableTeachersAmount -= 1;
        }
    }

    endLearningGroup(courseName, teacherName) {
        this.startedLearningGroups = this.startedLearningGroups
            .filter((group) => (group.courseName !== courseName) && (group.teacherName !== teacherName));

    }

    getLearningGroups(courseName) {
        return this.startedLearningGroups.filter(group => group.courseName === courseName);
    }
}

class Course {
    constructor(name, totalLessons, availableTeachersAmount) {
        this.name = name;
        this.totalLessons = totalLessons;
        this.availableTeachersAmount = availableTeachersAmount;

    }
}

class LearningGroup {
    passedLessons = [];

    constructor(courseName, teacherName, amountOfStudents) {
        this.courseName = courseName;
        this.teacherName = teacherName;
        this.amountOfStudents = amountOfStudents;
    }

    doneLesson(title, topics) {
        if (this.passedLessons.some((lesson) => lesson.title === title)) {
            return `Lesson with title ${title} already exists`
        }
        this.passedLessons.push(new Lesson(title, topics));
    }
}

class Lesson {
    topics = [];

    constructor(title, topics) {
        this.title = title;
        this.topics = Array.isArray(topics) ? topics : this.topics;
    }
}