// import {
//     CanActivate,
//     ActivatedRouteSnapshot,
//     RouterStateSnapshot,
//     UrlTree,
//     Router,
// } from "@angular/router";
// import { Injectable } from "@angular/core";
// import { Observable } from "rxjs";
// import { AuthService } from "./auth.service";
// import { map, take } from "rxjs/operators";

// @Injectable({ providedIn: "root" })
// export class UserRoleGuard implements CanActivate {
//     constructor(private authService: AuthService, private router: Router) {}

//     canActivate(
//         route: ActivatedRouteSnapshot,
//         router: RouterStateSnapshot
//     ):
//         | boolean
//         | UrlTree
//         | Promise<boolean | UrlTree>
//         | Observable<boolean | UrlTree> {
//         return this.authService.user.pipe(
//             take(1),
//             map((user) => {
//                 if (
//                     user &&
//                     route.data &&
//                     route.data.roles &&
//                     route.data.roles.includes(user.role)
//                 ) {
//                     return true;
//                 } else {
//                     return this.router.createUrlTree(["/login"]);
//                 }
//             })
//         );
//     }
// }
