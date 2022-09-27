import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, EMPTY } from 'rxjs';
import { EmptyExpr } from '@angular/compiler';
import { Calificacion } from "../module/calificacion";


@Injectable({
  providedIn: 'root'
})
export class CalificacionService {
  private url:string=`http://localhost:5000/calificacion`;
  private listaCambio = new Subject<Calificacion[]>()
  private confirmaEliminacion = new Subject<Boolean>()
  constructor(private http:HttpClient) { }
  listar(){
    return this.http.get<Calificacion[]>(this.url)
}
insertar(calificacion: Calificacion) {
  return this.http.post(this.url, calificacion);
}
setLista(listaNueva: Calificacion[]) {
  this.listaCambio.next(listaNueva);
}
getLista() {
  return this.listaCambio.asObservable();
}
modificar(calificacion: Calificacion) {
  return this.http.put(this.url + "/" + calificacion.id, calificacion);
}
listarId(id: number) {
  return this.http.get<Calificacion>(`${this.url}/${id}`);
}
eliminarId(id:number) {
  return this.http.delete(this.url+"/"+id);
}
getConfirmaEliminacion(){
  return this.confirmaEliminacion.asObservable();
}
setConfirmarEliminacon(estado: Boolean){
  this.confirmaEliminacion.next(estado);
}


}
