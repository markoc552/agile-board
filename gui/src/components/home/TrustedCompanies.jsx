import React from "react";
import {
  SolutionsWrapper,
  AgileWrapper,
  TrustedCompanyWrapper,
  TrustedCompany,
  TrustedCompanyDescription,
} from "../util/AgileStyledComponents";
import { Grid, Image } from "semantic-ui-react";
import { motion } from "framer-motion";
import useMediaQuery from "use-mediaquery";

const TrustedCompanies = (pops) => {
  const isTabletOnly = useMediaQuery("only screen and (max-width: 1010px)");

  const secondVariants = {
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.45 },
    },
    hidden: { opacity: 0 },
  };

  return (
    <TrustedCompanyWrapper>
      <div>
        <SolutionsWrapper>Trusted Companies</SolutionsWrapper>
        <div style={{ marginTop: "15px", width: "75vw" }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris.
        </div>
      </div>
      <motion.div initial="hidden" animate="visible" variants={secondVariants}>
        <div
          style={{
            display: "flex",
            flexDirection: isTabletOnly ? "column" : "row",
            width: "70vw",
          }}
        >
          <TrustedCompany style={{ backgroundColor: "#172b4d" }}>
            <Grid>
              <Grid.Row>
                <Image
                  src={require("../../assets/images/company-five.png")}
                  size="mini"
                  centered
                  style={{
                    width: "125px",
                    height: "125px",
                    margin: "0 auto",
                  }}
                />
              </Grid.Row>
              <Grid.Row>
                <div
                  style={{
                    margin: "0 auto",
                    fontSize: "17px",
                    color: "white",
                    fontWeight: "bold",
                  }}
                >
                  Lorem ipsum
                </div>
              </Grid.Row>
              <Grid.Row>
                <TrustedCompanyDescription>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </TrustedCompanyDescription>
              </Grid.Row>
            </Grid>
          </TrustedCompany>
          <TrustedCompany style={{ backgroundColor: "#79f2c0" }}>
            <Grid>
              <Grid.Row>
                <Image
                  src={require("../../assets/images/company-seven.png")}
                  size="mini"
                  centered
                  style={{
                    width: "125px",
                    height: "125px",
                    margin: "0 auto",
                  }}
                />
              </Grid.Row>
              <Grid.Row>
                <div
                  style={{
                    margin: "0 auto",
                    fontSize: "17px",
                    color: "white",
                    fontWeight: "bold",
                  }}
                >
                  Lorem ipsum
                </div>
              </Grid.Row>
              <Grid.Row>
                <TrustedCompanyDescription>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </TrustedCompanyDescription>
              </Grid.Row>
            </Grid>
          </TrustedCompany>
          <TrustedCompany style={{ backgroundColor: "#ffc400" }}>
            <Grid>
              <Grid.Row>
                <Image
                  src={require("../../assets/images/company-four.png")}
                  size="mini"
                  centered
                  style={{
                    width: "125px",
                    height: "125px",
                    margin: "0 auto",
                  }}
                />
              </Grid.Row>
              <Grid.Row>
                <div
                  style={{
                    margin: "0 auto",
                    fontSize: "17px",
                    color: "white",
                    fontWeight: "bold",
                  }}
                >
                  Lorem ipsum
                </div>
              </Grid.Row>
              <Grid.Row>
                <TrustedCompanyDescription>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </TrustedCompanyDescription>
              </Grid.Row>
            </Grid>
          </TrustedCompany>
          <TrustedCompany style={{ backgroundColor: "#0052cc" }}>
            <Grid>
              <Grid.Row>
                <Image
                  src={require("../../assets/images/company-five.png")}
                  size="mini"
                  centered
                  style={{
                    width: "125px",
                    height: "125px",
                    margin: "0vh auto",
                  }}
                />
              </Grid.Row>
              <Grid.Row>
                <div
                  style={{
                    margin: "0 auto",
                    fontSize: "17px",
                    color: "white",
                    fontWeight: "bold",
                  }}
                >
                  Lorem ipsum
                </div>
              </Grid.Row>
              <Grid.Row>
                <TrustedCompanyDescription>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </TrustedCompanyDescription>
              </Grid.Row>
            </Grid>
          </TrustedCompany>
        </div>
      </motion.div>
    </TrustedCompanyWrapper>
  );
};

export default TrustedCompanies;
