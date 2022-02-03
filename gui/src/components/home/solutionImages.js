import companyOne from "../../assets/images/company-one.png"
import companyTwo from "../../assets/images/company-two.png"
import companyThree from "../../assets/images/company-three.png"
import companyFour from "../../assets/images/company-four.png"
import companyFive from "../../assets/images/company-one.png"
import companySix from "../../assets/images/company-six.png"
import companySeven from "../../assets/images/company-seven.png"


export const images = [
  "https://www.prunderground.com/wp-content/uploads/2019/02/animation-creator-software-4.png",
  "https://www.prunderground.com/wp-content/uploads/2019/02/animation-creator-software-3.png",
  "https://www.prunderground.com/wp-content/uploads/2019/02/animation-creator-software-2.png",
  "https://www.prunderground.com/wp-content/uploads/2019/02/animation-creator-software.png",
];

export const imageBaseURI = "../../assets/images";

export const solutionImages = new Map([
  [
    "solution-1",
    [
      companyOne,
      companyTwo,
      companyThree,
    ],
  ],
  [
    "solution-2",
    [
      companyFour,
      companySeven,
      companyFive,
    ],
  ],
  [
    "solution-3",
    [
      companyFive,
      companySix,
      companyFour,
    ],
  ],
  [
    "solution-4",
    [
      companyThree,
      companyTwo,
      companyFive,
    ],
  ],
]);

export const softwareNames = new Map([
  ["solution-1", ["Software 1", "Software 2", "Software 3", "Software 4"]],
  ["solution-2", ["Software 5", "Software 6", "Software 7", "Software 8"]],
  ["solution-3", ["Software 9", "Software 10", "Software 11", "Software 12"]],
  ["solution-4", ["Software 13", "Software 14", "Software 15", "Software 16"]],
]);

export const keys = ["solution-1", "solution-2", "solution-3", "solution-4"];

export const titles = ["Solution 1", "Solution 2", "Solution 3", "Solution 4"];
