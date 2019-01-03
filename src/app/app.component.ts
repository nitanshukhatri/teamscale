import { Component, OnInit } from '@angular/core';
import { MeetikzService } from './core/services/meetinkz.service';
import { cloneDeep } from 'lodash';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'meetinkz';
  allMeetings: any = [];
  allMeetingsClone: any = [];

  lat = 51.5073509;
  lng = -0.12775829999998223;
  zoom = 12;
  markers = [];
  markerblueImg = 'http://team-scale.com/TestData/ng_text_v15/blue_marker.png';
  markerOrangeImg = 'http://team-scale.com/TestData/ng_text_v15/orange_marker.png'
  openedWindow = 0;

  constructor(private meetingService: MeetikzService) {

  }

  ngOnInit() {
    this.meetingService.getAllMeeting().subscribe(res => {
      const result: any = res;
      this.allMeetings = result;
      this.allMeetingsClone = cloneDeep(result);
      this.mapTheMarkers(this.allMeetings);
    });
  }
  radiusChanged(radius) {
    console.log(radius);
    // this.mapsAPILoader.load().then(() => {
    // });
  }

  locateOnMap(meeting, index) {
    console.log(meeting);
    this.markers.forEach(elm => {
      elm.url = this.markerblueImg;
    });
    this.markers[index].url = this.markerOrangeImg;
    this.markers[index].open = true;
  }

  clickedMarker(index: number, id) {
    if (this.markers[index].open === false) {
      console.log(`clicked the marker: ${index}`);
      this.markers[index].url = this.markerOrangeImg;
      this.openedWindow = id;
      this.markers[index].open = true;
      const searchProperty = cloneDeep(this.allMeetings.filter((list) => {
        return list['id'] === id;
      }));
      this.allMeetings = searchProperty;
    } else {
      this.markers[index].url = this.markerblueImg;
      this.openedWindow = id;
      this.markers[index].open = false;
      this.allMeetings = cloneDeep(this.allMeetingsClone);
    }
  }

  mapClicked() {

  }
  mapTheMarkers(meetings) {
    this.markers = [];
    meetings.forEach(element => {
      this.markers.push({
        lat: element.lat,
        lng: element.lon,
        url: this.markerblueImg,
        name: element.name,
        id: element.id,
        open: false
      });
    });
  }
  onSearch(event: any) {
    const term = event.target.value;

    if (term.length > 2) {
      const searchProperty = cloneDeep(this.allMeetings.filter((list) => {
        return list['name'].toLowerCase().indexOf(term.toLowerCase()) > -1;
      }));
      this.allMeetings = searchProperty;
      this.mapTheMarkers(this.allMeetings);
    } else {

      this.allMeetings = cloneDeep(this.allMeetingsClone);
      this.mapTheMarkers(this.allMeetings);
    }
  }


  isInfoWindowOpen(id) {
    return this.openedWindow === id; // alternative: check if id is in array
  }

}
