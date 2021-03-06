import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../../stylesheets/animations.css';
import Modal from 'react-modal'
import moment from 'moment'
import Interviews from './forms/Interviews.jsx'

class JobInfo extends Component {
  constructor() {
    super();
    this.state = {
      modalOpen: false
    }
  }


  handleEditClick = () => {
    this.props.editJob(this.props.job);
  }

  // convertToPhone = phone => {
  //   let first = phone.slice(0, 3);
  //   let second = phone.slice(3, 6);
  //   let third = phone.slice(6, 10);
  //   let converted = `(${first}) ${second} ${third}`;

  //   return converted;
  // }

  toggleModal = () => {
    this.setState({ modalOpen: !this.state.modalOpen })
  }

  render() {
    const { progress_in_search, job_status, job_posting_url, cover_url, resume_url, job_phone_number, job_email, job_id, company_logo, company_name, salary } = this.props.job;

    // Date format 
    const { date_logged } = this.props.job

    // Status message 
    const statusMessage = job_status === 'awaiting' ? 'Awaiting response' : job_status === 'offered' ? `Offered: ${salary || ''}` : 'Rejected';

    // Toggle classes 
    const alternateBg = (this.props.index) % 2 === 0 ? 'job-info-light' : 'job-info-dark';
    const expand = this.props.expandClass ? this.props.expandClass : null;
    const initiateProgressEarned = this.props.expandClass ? "job-info-search-progress-earned" : null;

    // Progress bars: awaiting, rejected, offered 
    let progressPercentage;
    let progressTotalStyle;
    let progressStyle;

    if (job_status === 'offered') {
      progressPercentage = 100;
      progressTotalStyle = {
        backgroundColor: 'rgb(125, 206, 160)'
      }
      progressStyle = {
        backgroundColor: 'rgb(82, 190, 128)'
      }
    } else if (job_status === 'rejected') {
      progressPercentage = 100;
      progressTotalStyle = {
        backgroundColor: 'rgb(241, 148, 138)'
      }
      progressStyle = {
        backgroundColor: 'rgb(236, 112, 99)'
      }
    } else {
      progressPercentage = (parseInt(progress_in_search) / 5) * 100;
      progressStyle = {
        width: `${progressPercentage}%`
      }
    }

    // Mobile version of expanded job information 
    let mobileVersion = (
      <div className="job-info-view-mobile">
        <div className="job-info-top">
          <img src={company_logo} alt={company_name} />
        </div>

        <div className="job-info-company-container">
          <p className="interview-modal-button" onClick={this.toggleModal}>Interviews</p>
        </div>

        <div className="job-info-user-container">
          <p>{job_posting_url ? <a href={job_posting_url} target="_blank">Go to job posting <i className="fas fa-external-link-alt"></i></a> : null}</p>
          <p>{resume_url ? <a href={`https://s3.amazonaws.com/elevateresumes/${resume_url}`} target="_blank">Resume <i className="fas fa-download"></i></a> : "No resume on file"}</p>
          <p>{cover_url ? <a href={`https://s3.amazonaws.com/elevatecovers/${cover_url}`} target="_blank">Cover Letter <i className="fas fa-download"></i></a> : "No cover letter on file"}</p>
          <p>Logged on: {moment(date_logged).format("dddd, MMMM Do YYYY")}</p>
        </div>

        <div className="job-info-button-container">
          <Link to={`/updateJob/${job_id}`}>
            <button>Update Job</button>
          </Link>
        </div>

        <div className="job-info-status-container">
          <p>Status: {statusMessage}</p>
        </div>

        <div className="job-info-bottom">
          <div className="job-info-search-progress-total" style={progressTotalStyle}>
            <div className={initiateProgressEarned} style={progressStyle} />
          </div>
        </div>

      </div>
    );


    return (
      <div className={`job-info-container ${expand} ${alternateBg}`}>
        <div className="job-info-view-web">

          <div className="job-info-top">
            <div className="job-info-logo-container">
              <img src={company_logo} alt={company_name} />
            </div>

            <div className="job-info-company-container">
              <p>
                {job_posting_url ? <a href={job_posting_url} target="_blank">Go to job posting</a> : null}
              </p>
              <p className="interview-modal-button" onClick={this.toggleModal}>Interviews</p>
            </div>

            <div className="job-info-user-container">
              <p>Logged on: {moment(date_logged).format("dddd, MMMM Do YYYY")}</p>
              <p>
                {resume_url ? <a href={`https://s3.amazonaws.com/elevateresumes/${resume_url}`} target="_blank">Resume</a> : "No resume on file. Add one now."}
              </p>
              <p>
                {cover_url ? <a href={`https://s3.amazonaws.com/elevatecovers/${cover_url}`} target="_blank">Cover Letter</a> : "No cover letter on file. Add one now."}
              </p>
            </div>

            <div className="job-info-button-container">
              <Link to={`/updateJob/${job_id}`}>Update Job</Link>
            </div>
          </div>

          <div className="job-info-mid">
            <p>Status: {statusMessage}</p>
          </div>

          <div className="job-info-bottom">
            <div className="job-info-search-progress-total" style={progressTotalStyle}>
              <div className={initiateProgressEarned} style={progressStyle} />
            </div>
          </div>
        </div>

        {mobileVersion}

        <Modal
          isOpen={this.state.modalOpen}
          onRequestClose={this.toggleModal}
          contentLabel="job-info-interview-modal"
          className="job-info-interview-modal"
        >
          <Interviews job_id={job_id} toggleModal={this.toggleModal} />
        </Modal>
      </div>
    );
  }
}

export default JobInfo;
