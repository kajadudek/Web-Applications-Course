import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tripStatus',
  pure: false
})
export class TripStatusPipe implements PipeTransform {

  transform(boughtList: any, args: boolean[]): any {
    if (!boughtList) {
      return [];
    }

    if (!args || args.length == 0 || (args[0] == false && args[1] == false && args[2] == false)){
      return boughtList;
    }

    let result = [];

    for (let trip of boughtList){
      if (trip.toBe == args[0] && args[0] == true){ result.push(trip);}
      else if (trip.ended == args[1] && args[1] == true) {result.push(trip);}
      else if (trip.during == args[2] && args[2] == true){result.push(trip);}
    }
    return result;
  }
}
