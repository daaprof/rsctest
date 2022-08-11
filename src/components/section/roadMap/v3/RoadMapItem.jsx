const RoadMapItem = ({ progressIcon, progress, title, text, thumb }) => {
  return (
    <div className="rsc_roadmap_item"> 
      <div className="roadmap_parcentage">
        <span>{progress}</span>
        <span className="parcentage">%</span>
      </div> 
      <div className="rsc_roadmap_content"> 
        <div className="rsc_roadmap_text">
          <div className="roadmap_heading">
            <h5 className="mb-15"> {title} </h5>
            <img src={progressIcon} alt="rsc nft progress" />
          </div>
          <p>{text}</p>
        </div>
      </div>
      <div className="roadmap_img">
        <img src={thumb} alt="rsc nft progress" />
      </div>
    </div>
  );
};

export default RoadMapItem;
