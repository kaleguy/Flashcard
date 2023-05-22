import Splash from "./splash/Spash";

const viewpanel = (props: any) => {
  return (
    <div>
      <div>
        <Splash subdeck={props.selectedSubdeck} />
      </div>
    </div>
  );
};

export default viewpanel;
