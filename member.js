function skillsMember() {
  var member = new Member();
  member.name = "John";
  member.skills = ["JavaScript", "React", "NodeJs"];
  member.showSkills = function() {
    member.skills.forEach(function(skill) {
      console.log(`${member.name} knows ${skill}`);
    });
  };
  return member;
  
}