import { Building2, Users, Briefcase, Info } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import type { CompanyIntel } from '../../types/analysis';

interface CompanyIntelCardProps {
  intel: CompanyIntel;
}

const sizeConfig = {
  startup: {
    color: 'bg-green-100 text-green-800',
    iconColor: 'text-green-600',
    badge: 'Startup',
  },
  midsize: {
    color: 'bg-blue-100 text-blue-800',
    iconColor: 'text-blue-600',
    badge: 'Mid-size',
  },
  enterprise: {
    color: 'bg-purple-100 text-purple-800',
    iconColor: 'text-purple-600',
    badge: 'Enterprise',
  },
};

export function CompanyIntelCard({ intel }: CompanyIntelCardProps) {
  const config = sizeConfig[intel.size];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Building2 className="w-5 h-5 text-primary-600" />
          Company Intel
          <span className="text-xs font-normal text-gray-400 ml-auto flex items-center gap-1">
            <Info className="w-3 h-3" />
            Demo Mode
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Company Name & Badge */}
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-gray-900">{intel.name}</h3>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${config.color}`}>
            {config.badge}
          </span>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <Briefcase className={`w-5 h-5 ${config.iconColor}`} />
            <div>
              <p className="text-xs text-gray-500">Industry</p>
              <p className="text-sm font-medium text-gray-900">{intel.industry}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <Users className={`w-5 h-5 ${config.iconColor}`} />
            <div>
              <p className="text-xs text-gray-500">Company Size</p>
              <p className="text-sm font-medium text-gray-900">{intel.sizeLabel}</p>
            </div>
          </div>
        </div>

        {/* Hiring Focus */}
        <div className="bg-primary-50 border border-primary-100 rounded-lg p-4">
          <h4 className="font-medium text-primary-900 mb-2 flex items-center gap-2">
            <Briefcase className="w-4 h-4" />
            Typical Hiring Focus
          </h4>
          <p className="text-sm text-primary-800 leading-relaxed">
            {intel.hiringFocus}
          </p>
        </div>

        {/* Demo Note */}
        <p className="text-xs text-gray-400 text-center">
          Company intel generated heuristically based on company name and JD analysis.
        </p>
      </CardContent>
    </Card>
  );
}
