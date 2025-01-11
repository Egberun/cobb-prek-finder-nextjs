import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Facility } from '@/types/facility';
import { formatPrice, formatRating, getAvailabilityStatus } from '@/lib/utils/facility';

interface FacilityComparisonProps {
  facilities: Facility[];
}

const ComparisonCategory = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="mb-6">
    <h3 className="font-semibold mb-4 text-lg">{title}</h3>
    {children}
  </div>
);

const ComparisonRow = ({
  label,
  facilities,
  getValue,
  renderValue,
}: {
  label: string;
  facilities: Facility[];
  getValue: (facility: Facility) => any;
  renderValue?: (value: any) => React.ReactNode;
}) => (
  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 py-2 border-b">
    <div className="font-medium">{label}</div>
    {facilities.map((facility, index) => {
      const value = getValue(facility);
      return (
        <div key={index} className="text-sm">
          {renderValue ? renderValue(value) : value}
        </div>
      );
    })}
  </div>
);

export default function FacilityComparison({ facilities }: FacilityComparisonProps) {
  if (!facilities.length) {
    return null;
  }

  return (
    <Card className="w-full max-w-7xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Compare Pre-K Facilities</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Facility Headers */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="font-bold">Comparison Criteria</div>
          {facilities.map((facility, index) => (
            <div key={index} className="space-y-2">
              <h3 className="font-bold text-lg">{facility.name}</h3>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={`text-lg ${i < facility.rating.stars ? 'text-yellow-400' : 'text-gray-300'}`}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Basic Information */}
        <ComparisonCategory title="Basic Information">
          <ComparisonRow
            label="Type"
            facilities={facilities}
            getValue={(f) => f.type}
            renderValue={(type) => (
              <Badge variant="secondary" className="capitalize">
                {type}
              </Badge>
            )}
          />
          <ComparisonRow
            label="Location"
            facilities={facilities}
            getValue={(f) => f.location.address}
          />
          <ComparisonRow
            label="Rating"
            facilities={facilities}
            getValue={(f) => formatRating(f.rating)}
          />
          <ComparisonRow
            label="Capacity"
            facilities={facilities}
            getValue={(f) => f.capacity.total}
            renderValue={(total) => `${total} children`}
          />
        </ComparisonCategory>

        {/* Programs & Features */}
        <ComparisonCategory title="Programs & Features">
          <ComparisonRow
            label="Programs"
            facilities={facilities}
            getValue={(f) => f.programs}
            renderValue={(programs) => (
              <div className="flex flex-wrap gap-1">
                {programs.map((program: string, i: number) => (
                  <Badge key={i} variant="secondary" className="text-xs">
                    {program}
                  </Badge>
                ))}
              </div>
            )}
          />
          <ComparisonRow
            label="Features"
            facilities={facilities}
            getValue={(f) => f.features}
            renderValue={(features) => (
              <ul className="list-disc list-inside">
                {features.map((feature: string, i: number) => (
                  <li key={i} className="text-sm">{feature}</li>
                ))}
              </ul>
            )}
          />
        </ComparisonCategory>

        {/* Schedule & Availability */}
        <ComparisonCategory title="Schedule & Availability">
          <ComparisonRow
            label="Hours"
            facilities={facilities}
            getValue={(f) => f.schedule.hours}
          />
          <ComparisonRow
            label="Availability"
            facilities={facilities}
            getValue={(f) => getAvailabilityStatus(f)}
            renderValue={(status) => (
              <Badge
                variant={
                  status.status === 'open'
                    ? 'success'
                    : status.status === 'limited'
                    ? 'warning'
                    : 'destructive'
                }
              >
                {status.text}
              </Badge>
            )}
          />
        </ComparisonCategory>

        {/* Pricing */}
        <ComparisonCategory title="Pricing & Fees">
          <ComparisonRow
            label="Tuition"
            facilities={facilities}
            getValue={(f) => formatPrice(f.price)}
          />
        </ComparisonCategory>
      </CardContent>
    </Card>
  );
}