import { Pipe, PipeTransform } from '@angular/core';
import { Trip } from '../servicedata.service';

@Pipe({
  name: 'localisation',
  pure: false
})
export class FilterPipe implements PipeTransform {

  transform(tripList: Trip[], search: string[]): Trip[] {

    if (!tripList){
      return [];
    }
    if(!search || search.length == 0){
      return tripList;
    }

    let result = [];
    let finalResult = [];

    for (let searchWord of search){
      result = (searchThroughList(searchWord.toLowerCase(), tripList));
      for (let trip in result){
        finalResult.push(result[trip]);
      }
    }

    return finalResult;
  }


}
function searchThroughList(search: string, tripList: Trip[]) {
  return tripList.filter(trip => {
    return trip.destinationCountry.toLowerCase().includes(search);
  });
}

