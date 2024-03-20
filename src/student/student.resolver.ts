import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { StudentService } from './student.service';
import { StudentType } from './student.type';
import { CreateStudentInput } from './student.input';

@Resolver(() => StudentType)
export class StudentResolver {

  constructor(private studentService: StudentService) {
  }

  @Query(() => StudentType)
  async student(@Args('id') id: string) {
    return this.studentService.getStudent(id);
  }

  @Query(() => [StudentType])
  async students() {
    return this.studentService.getStudents();
  }

  @Mutation(() => StudentType)
  async createStudent(@Args('createStudentInput') createStudentInput: CreateStudentInput) {
    return this.studentService.createStudent(createStudentInput);
  }

}
