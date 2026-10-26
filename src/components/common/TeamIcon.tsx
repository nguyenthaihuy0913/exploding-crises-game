import React from 'react';
import { Compass, Brain, Zap, Target, Shield, Lightbulb, Users } from 'lucide-react';

interface TeamIconProps {
  name: string;
  className?: string;
}

export const TeamIcon: React.FC<TeamIconProps> = ({ name, className = 'w-5 h-5' }) => {
  switch (name) {
    case 'compass':
      return <Compass className={className} />;
    case 'brain':
      return <Brain className={className} />;
    case 'zap':
      return <Zap className={className} />;
    case 'target':
      return <Target className={className} />;
    case 'shield':
      return <Shield className={className} />;
    case 'lightbulb':
      return <Lightbulb className={className} />;
    default:
      return <Users className={className} />;
  }
};
