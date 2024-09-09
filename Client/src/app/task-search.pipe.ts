import { Pipe, PipeTransform } from '@angular/core';
import { Appointmet } from './models/appointment';


@Pipe({
  name: 'taskSearch'
})
export class TaskSearchPipe implements PipeTransform {

  transform(tasks: Appointmet[], searchTerm: string): Appointmet[] {
    if (!tasks || !searchTerm) {
      return tasks;
    }

    searchTerm = searchTerm.toLowerCase();

    return tasks.filter(task =>
      task.title.toLowerCase().includes(searchTerm) ||
      task.description.toLowerCase().includes(searchTerm)
    );
  }
}
