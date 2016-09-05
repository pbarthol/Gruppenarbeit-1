import { Component } from '@angular/core';
//import { FormsModule } from '@angular/forms';

@Component({
    selector: 'my-app',
    template: `
        <!--<div class="row">-->
            <!--<section >-->
                <!--<input [(ngModel)]="user.first_name">-->
            <!--</section>-->
        <!--</div>-->
        <div>
            <section>
                <article class="panel panel-default">
                    <div class="panel-body">
                        {{user.email}}
                    </div>
                    <footer class="panel-footer">
                        <div class="user">
                            {{user.first_name}}
                            {{user.last_name}}
                            {{user.email}}
                        </div>
                        <div class="config">
                            <a href="#">Edit</a>
                            <a href="#">Delete</a>
                        </div>
                    </footer>
                </article>
            </section>
        </div>
   `,
    styles: [`
        .user {
            display: inline-block;
            font-style: italic;
            font-size: 12px;
            width: 80%;
        }
        .config {
            display: inline-block;
            text-align: right;
            font-size: 12px;
            width: 19%;
        }
    `]
})
export class AppComponent {
    user= {
        first_name:'Mike',
        last_name: 'Hueppi',
        email: 'mike.hueppi@hsr.ch'
    };
}