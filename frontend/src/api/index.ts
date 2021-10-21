import axios, { Axios, AxiosResponse } from 'axios';
import { IUserLogin } from '../pages/Auth/Login.page';
import { IUserResFromServer } from '../store/reducers/userReducer';
import { IUserRegister } from '../pages/Auth/Register.page';
import { ITask } from '../store/reducers/tasksRecucer';

class ApiService {
  request: Axios;
  withAuth: Axios;
  token: string | null = localStorage.getItem('jwt');

  constructor() {
    this.request = axios.create({
      baseURL: 'http://localhost:8000',
    });

    this.withAuth = axios.create({
      baseURL: 'http://localhost:8000',
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });
  }
}

class UsersApi extends ApiService {
  public addSignin(userData: IUserLogin) {
    return this.request.post<IUserLogin, AxiosResponse<IUserResFromServer>>('/users/signin', userData);
  }

  public register(userData: IUserRegister) {
    return this.request.post<IUserRegister, AxiosResponse<IUserResFromServer>>('/users/create', userData);
  }

  public getUser() {
    return this.withAuth.get('/users/me');
  }
}

class CoursesApi extends ApiService {
  public getAllCourses() {
    return this.withAuth.get('/courses');
  }

  public getCurrentCourse(id: number) {
    return this.withAuth.get(`/courses/course?id=${id}`);
  }
}

class HomeworksApi extends ApiService {
  public getAllHomeworks() {
    return this.withAuth.get(`/homeworks/all`);
  }

  public getCurrentHomework(id: number) {
    return this.withAuth.get(`/homeworks/homework?id=${id}`);
  }
}

class LessonsApi extends ApiService {
  public getCurrentLesson(id: number) {
    return this.withAuth.get(`/lessons/lesson?id=${id}`);
  }
}

class PassApi extends ApiService {
  public getCurrentPass(id: number) {
    return this.withAuth.get(`/pass?id=${id}`);
  }
}

class TasksApi extends ApiService {
  public getAllTasks() {
    return this.withAuth.get('/tasks/all');
  }

  public getAllTaskUser(userId: number) {
    return this.withAuth.get(`tasks/user?id=${userId}`);
  }

  public getCurrentTask(taskId: number) {
    return this.withAuth.get(`/tasks?id=${taskId}`);
  }

  public postDoneTask(homeworkId: number, userId: number, taskData: ITask) {
    return this.withAuth.post(`/tasks?homework-id=${homeworkId}&user-id=${userId}`, taskData);
  }
}

export const usersApi = new UsersApi();
export const coursesApi = new CoursesApi();
export const homeworksApi = new HomeworksApi();
export const lessonsApi = new LessonsApi();
export const passApi = new PassApi();
export const tasksApi = new TasksApi();
