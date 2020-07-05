import { NgModule } from "@angular/core";
import {
  NoNullValuesPipe,
  NoNullObjectValuesPipe
} from "./no-null-values/no-null-values";

@NgModule({
  declarations: [NoNullObjectValuesPipe, NoNullValuesPipe],
  imports: [],
  exports: [NoNullObjectValuesPipe, NoNullValuesPipe]
})
export class PipesModule {}
