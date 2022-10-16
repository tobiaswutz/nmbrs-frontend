import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-staking',
  templateUrl: './staking.component.html',
  styleUrls: ['./staking.component.css']
})
export class StakingComponent implements OnInit {

  public options: any = null

  constructor() { }

  ngOnInit() {
  }

  public calculateRewards() {
    let amount = 25000;
    const months = 240;
    const interestRatePerYear = 0.05;
    const interestRatePerMonth = interestRatePerYear / 12;
    const interestratePer5Days = interestRatePerMonth / 4;

    const monthsToCalculate = []
    for (let i = 0; i < months; i++) {
      monthsToCalculate.push(i);
    }

    const rewardsPerMonth: number[] = []
    monthsToCalculate.forEach(month => {
      console.log(interestratePer5Days);
      
      const reward = amount * interestratePer5Days;
      amount = amount + reward;

      rewardsPerMonth.push(reward);
    });

    console.log(rewardsPerMonth);


    this.options = {
      xAxis: {
        type: 'category',
        data: monthsToCalculate
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: rewardsPerMonth,
          type: 'bar'
        }
      ]
    };
  }

}
