import { Component } from "@angular/core";

import { NavController } from "ionic-angular";

import { MTDInfo } from "../../app/global";

import { environment } from "../../environments/environment";

@Component({
  selector: "page-about",
  templateUrl: "about.html"
})
export class About {
  version = environment.versions.app;
  language: string = MTDInfo.config["L1"]["name"];
  build: string = "";
  constructor(public navCtrl: NavController) {
    if (MTDInfo && MTDInfo.config && "build" in MTDInfo.config) {
      this.build = this.buildToString(MTDInfo.config["build"]);
    }
  }

  buildToString(build: string) {
    let year = build.slice(0, 4);
    let month = build.slice(4, 6);
    let day = build.slice(6, 8);
    let time = build.slice(8, 10) + ":" + build.slice(10, 12);
    return `The data in this app was compiled at ${time} on ${year}/${month}/${day}`;
  }
}
