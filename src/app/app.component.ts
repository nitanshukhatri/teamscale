import { Component, OnInit } from '@angular/core';
import { MeetikzService } from './core/services/meetinkz.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'meetinkz';
  allMeetings: any = [];

  lat = 51.5073509;
  lng = -0.12775829999998223;
  zoom = 8;
  markers = [];
  markerImg = 'http://team-scale.com/TestData/ng_text_v15/blue_marker.png';
  openedWindow: number = 0;

  constructor(private meetingService: MeetikzService) {

  }

  ngOnInit() {
    this.meetingService.getAllMeeting().subscribe(res => {
      const result: any = res;
      this.allMeetings = result;
      result.forEach(element => {
        this.markers.push({
          lat: element.lat,
          lng: element.lon,
          url: this.markerImg,
          name: element.name,
          id: element.id
        });
      });
    });
  }

  locateOnMap(meeting, index) {
    console.log(meeting);
    this.markers.forEach(elm => {
      elm.url = this.markerImg;
    });
    this.markers[index].url = 'http://team-scale.com/TestData/ng_text_v15/orange_marker.png';
  }

  clickedMarker(index: number, id) {
    console.log(`clicked the marker: ${index}`);
    this.markers[index].url = 'http://team-scale.com/TestData/ng_text_v15/orange_marker.png';
    this.openedWindow = id;
  }
  mapClicked() {

  }


  isInfoWindowOpen(id) {
    return this.openedWindow === id; // alternative: check if id is in array
  }

}
