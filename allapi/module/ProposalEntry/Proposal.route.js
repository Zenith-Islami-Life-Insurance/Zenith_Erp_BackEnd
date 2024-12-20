const express = require("express");
const router = express.Router();
const ProposalController = require("./Proposal.controller");

router

  .get("/occupation", ProposalController.getOccupationList)
  .get("/educationList", ProposalController.educationList)
  .get("/religionList", ProposalController.religionList)
  .get("/all-branch", ProposalController.getAllbranch)
  .get("/country", ProposalController.getCountryList)
  .get("/all-premium", ProposalController.allPremiumList)
  .get("/all-bank", ProposalController.allBankList)
  .get("/type-list", ProposalController.typeList)

  .get("/all-gender", ProposalController.getAllgenderList)
  .get("/all-locallity", ProposalController.getLocallity)
  .get("/all-project", ProposalController.getAllprojectt)
  .get("/chain-list/:base_project/:base_code", ProposalController.getchainList)
  .get("/proposal-info", ProposalController.getProposalInformation)
  .get("/rel-id/:proposal_n/:rel_code", ProposalController.getRelId)

  .get("/policy-info", ProposalController.getPolicyInformation)
  .get("/agent-list/:base_project", ProposalController.getAgentList)
  .get("/all-district", ProposalController.getAllDivision)
  .get("/thana-list/:div_code", ProposalController.getThanaList)
  .get("/post-office/:code", ProposalController.getPostofficeList)
  .post("/proposal-entry", ProposalController.InsertProposalDataController)
  .post("/proposal-entry-address", ProposalController.InsertProposalAddressDataController)
  .post("/proposal-extend", ProposalController.InsertProposalExtendDataController)
  .post("/family-history", ProposalController.InsertFamilyHistory)
  .post("/proposal-entry-chain", ProposalController.InsertProposalChainDataController)
  .post("/nominee", ProposalController.InsertNomineeController)
  .post("/proposal-entry-chain-setup", ProposalController.InsertProposalChainSetupDataController)
  .post("/proposal-entry2", ProposalController.InsertProposal2DataController)
  .post('/sumAssured', ProposalController.getSumAssuredController)
  .patch("/proposal-update/:PROPOSAL_N", ProposalController.updatepurchaseByChno)
  // .put("/update_proposal/:PROPOSAL_N", ProposalController.updateTablesController)
  .put("/medical-info/:PROPOSAL_N", ProposalController.updateMedicalInfo)
  .put("/prev-policy-no/:PROPOSAL_N", ProposalController.updatePreviousPolicyNo)
  .put("/nominee/:slno", ProposalController.updateNominee)

  .get("/proposal-number", ProposalController.getProposalNumber)
  .get("/nominee/:proposalNumber", ProposalController.getNominees)
  .get(
    "/comm_date/:com_date/:policy_type",
    ProposalController.getCommencementDate
  )
  .get("/all-plan/:age", ProposalController.getAllPlanList)
  .get("/prem-plan-list/:sum_assured", ProposalController.getPremPlanList)
  .get("/mode-list/:plan_id", ProposalController.getPayModeList)
  .get("/branch-list/:bank_code", ProposalController.getBranchList)
  .get("/nominee-branch-list/:bank_code", ProposalController.getNomineeBranchList)
  .post("/nominees", ProposalController.Insertnominees)

  .get("/term-list/:plan_id/:age", ProposalController.getTermList)
  .get("/get-age/:comm_date/:dob", ProposalController.getAgee)
  .get("/get-nomineeAge/:comm_date/:dob", ProposalController.getNomineeAgee)
  .get(
    "/total-installment/:pay_mode/:term",
    ProposalController.getTotalInstallments
  )
  .get('/suppli-class/:occup_id/:supp_code', ProposalController.supplimentClassList)
  .get("/suppliment-list", ProposalController.supplimentList)
  .get(
    "/rate-calculation/:age/:term/:table_id/:cAge",
    ProposalController.getRateCalcultions
  )
  .get(
    "/suppliment-premium/:table_id/:occup_id/:supp_type/:supp_class/:sum_assured/:pay_mode",
    ProposalController.getSupplimentValue
  )
  .get(
    "/basic-premium/:table_id/:term_id/:age/:instmode/:sum_ass/:option/:pension/:death_coverage",
    ProposalController.getBasicPremValue
  )
  .get(
    "/sumAssurance/:table_id/:term_id/:age/:monthlyPremium/:sum_insured",
    ProposalController.getSumAssurance
  )

  .get("/endAtDate/:RISKDATE", ProposalController.getEndatDate)

  .get(
    "/sumat-risk/:table_id/:sum_ass/:premium/:factor/:instmode",
    ProposalController.getSumatRisks
  )
  .get(
    "/rider-prem-rate/:table_id/:term_id/:dob/:risk_date/:sum_insured/:instmode",
    ProposalController.getRiderRatePremium
  )
  .get(
    "/rider-prem-rate/:table_id/:term_id/:dob/:risk_date/:sum_insured/:instmode",
    ProposalController.getRiderRatePremium
  )
  .get(
    "/waiver-prem/:age/:plan/:basic_prem",
    ProposalController.getWaiverPremium
  )
  .get(
    "/suppli-rate/:occup_code/:supp_code/:class_id",
    ProposalController.getSupplimentaryRate
  )
  .get(
    "/occupRate/:occup",
    ProposalController.getOccupationRate
  )
  .get(
    "/waiver_premium/:age/:table_id/:premium",
    ProposalController.getWaiverPremiumController
  )

  .get(
    "/hospital-prem/:table_id/:occup_code/:gender/:sum_assured/:last_education/:last_education_document/:instmode",
    ProposalController.getHospitalPremRate
  )
  .get(
    "/mdr-prem/:table_id/:term/:dob/:com_date/:sumAssurance/:instmode/:prem",
    ProposalController.getMdrPremiumController
  )
  .get(
    "/mdr-rate/:table_id/:term/:dob/:com_date/:sumAssurance/:instmode/:rate",
    ProposalController.getMdrRateController
  )

  .get(
    "/ipd-prem-rate/:plan_no/:dob/:risk_rate/:instmode/:table_id",
    ProposalController.getIpdPremrate
  )

  .get(
    "/ipd-plan/:riskAdate/:txtSumInsured",
    ProposalController.getPlanDetailsController
  )
  .get(
    "/medical-status/:proposalNo",
    ProposalController.getMedicalStatus
  )
  .get(
    "/maturity-date/:com_date/:term",
    ProposalController.getMaturityDate
  )
  .get(
    "/option/:table_id",
    ProposalController.getOption
  )
  .post(
    "/ipdRider",
    ProposalController.InsertPremInfoController
  )
  .delete(
    "/ipdRider/delete/:proposalNumber",
    ProposalController.deletePremInfoController
  )
  .delete(
    "/nominee/delete/:slno",
    ProposalController.deleteNominee
  )
  .put(
    "/update-proposal-dummy/:proposalNumber",
    ProposalController.UpdateProposalDummyController
  )
  .get(
    "/previous-sumassurance/:policyNo",
    ProposalController.getPreviousSumassurance
  )

module.exports = router;
