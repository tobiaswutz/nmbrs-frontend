import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public user: any = null;
  public options: any = null;
  public options2: any = null;

  constructor(
    private userService: UserService,
    private authService: AuthService
  ) { }
  ngOnInit() {
    this.user = this.userService.getUserInfo();
    this.options = {
      backgroundColor: 'transparent',
      title: {
        text: 'Portfolio verteilung',
        left: 'center',
        top: 20,
        textStyle: {
          color: '#ccc'
        }
      },
      tooltip: {
        trigger: 'item'
      },
      visualMap: {
        show: false,
        min: 80,
        max: 600,
        inRange: {
          colorLightness: [0, 1]
        }
      },
      series: [
        {
          name: 'Coin',
          type: 'pie',
          radius: '55%',
          center: ['50%', '50%'],
          data: [
            { value: 335, name: 'Cardano' },
            { value: 310, name: 'Ethereum' },
            { value: 274, name: 'Bitcoin' },
            { value: 235, name: 'Tether' },
            { value: 400, name: 'MELD' },
            { value: 500, name: 'MELD2' },
            { value: 430, name: 'MELD33' },
            { value: 470, name: 'MELD4' },
          ].sort(function (a, b) {
            return a.value - b.value;
          }),
          roseType: 'radius',
          label: {
            color: 'rgba(255, 255, 0.3)'
          },
          labelLine: {
            lineStyle: {
              color: 'rgba(255, 255, 0.3)'
            },
            smooth: 0.2,  
            length: 10,
            length2: 20
          },
          itemStyle: {
            color: 'yellow',
            shadowBlur: 200,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          },
          animationType: 'scale',
          animationEasing: 'elasticOut',
          animationDelay: function (idx: any) {
            return Math.random() * 200;
          }
        }
      ]
    };

    this.options2 = {
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: [120, 200, 150, 80, 70, 110, 130],
          type: 'bar'
        }
      ]
    };
  }

  public logout(): void {
    this.authService.logout();
  }

}
