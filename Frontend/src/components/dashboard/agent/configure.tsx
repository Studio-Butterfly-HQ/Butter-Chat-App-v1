import { useState } from 'react';
import { IdCard , Smile, FileText, AlertCircle, BadgeCheck , Check, X, Info,  } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Toggle } from '@/components/ui/toggle';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

interface PersonalityTrait {
  id: string;
  label: string;
  icon: React.ReactNode;
  selected: boolean;
}

export const Configure = () => {
  const [businessName, setBusinessName] = useState('');
  const [generalInstruction, setGeneralInstruction] = useState('');

  const initialPersonalityTraits: PersonalityTrait[] = [
    { id: 'friendly', label: 'Friendly', icon: <Smile className="h-4 w-4" />, selected: true },
    { id: 'supportive', label: 'Supportive', icon: <Smile className="h-4 w-4" />, selected: true },
    { id: 'approachable', label: 'Approachable', icon: <Smile className="h-4 w-4" />, selected: false },
    { id: 'compassionate', label: 'Compassionate', icon: <Smile className="h-4 w-4" />, selected: false },
  ];

  const [personalityTraits, setPersonalityTraits] = useState<PersonalityTrait[]>(initialPersonalityTraits);
  const [openItems, setOpenItems] = useState<string[]>(['identity']);

  // Additional controlled fields for other sections so cancel can revert
  const [aiFallback, setAiFallback] = useState('transfer');
  const [aiFallbackCustom, setAiFallbackCustom] = useState(`I may not have that information at the moment, but one of our human agents will be happy to assist you. If you'd like to connect to our human agents, press yes, or if you have a specific product in mind, you can directly contact our customer service team at +88 09 678 444 777 or email customerservice.aerong@brac.net`);
  const [aiFallbackWait, setAiFallbackWait] = useState(false);
  const [humanTransferMessage, setHumanTransferMessage] = useState('I am connecting you to a human agent.');

  const toggleTrait = (id: string) => {
    setPersonalityTraits(traits =>
      traits.map(trait =>
        trait.id === id ? { ...trait, selected: !trait.selected } : trait
      )
    );
  };

  const handleCancel = (section: string) => {
    // Revert changes for specific sections
    if (section === 'identity') {
      setBusinessName('');
    }

    if (section === 'personality') {
      setPersonalityTraits(initialPersonalityTraits);
    }

    if (section === 'general-instruction') {
      setGeneralInstruction('');
    }

    if (section === 'ai-unable') {
      setAiFallback('transfer');
      setAiFallbackCustom(`I may not have that information at the moment, but one of our human agents will be happy to assist you. If you'd like to connect to our human agents, press yes, or if you have a specific product in mind, you can directly contact our customer service team at +88 09 678 444 777 or email customerservice.aerong@brac.net`);
      setAiFallbackWait(false);
    }

    if (section === 'human-agent') {
      setHumanTransferMessage('I am connecting you to a human agent.');
    }

    // Close the accordion item
    setOpenItems(prev => prev.filter(v => v !== section));
  };

  return (
    <div className="p-4 pt-0  space-y-3">
      <Accordion type="multiple" value={openItems} onValueChange={setOpenItems} className="space-y-3">
        {/* Identity Section */}
        <AccordionItem value="identity" className="border border-border rounded-xl">
          <AccordionTrigger className="hover:no-underline p-4">
            <div className="flex items-center gap-4">
                <IdCard  className="h-6 w-6" />
              <div className="text-left">
                <div className="font-medium text-primary">Identity</div>
                <div className="text-sm font-normal text-muted-foreground">Name & Avatar</div>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent className="p-4 border-t border-border space-y-4">
            <div className="space-y-2">
              <Label htmlFor="businessName" className="text-muted-foreground text-sm">Business Name</Label>
              <Input
                id="businessName"
                value={businessName}
                placeholder="Enter business name"
                onChange={(e) => setBusinessName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label className="text-muted-foreground text-sm">Avatar</Label>
              <div className="flex items-center gap-4">
                <Button variant="outline" size="sm" className="bg-muted">
                  Choose File
                </Button>
                <span className="text-sm text-muted-foreground">No File Choosen</span>
              </div>
            </div>
            <div className="flex gap-2">
              <Button size="sm" >
                <Check /> Save
              </Button>
              <Button variant="outline" size="sm" className="bg-transparent" onClick={() => handleCancel('identity')}>
                <X /> Cancel
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Personality Section */}
        <AccordionItem value="personality" className="border border-border rounded-xl">
          <AccordionTrigger className="hover:no-underline p-4">
            <div className="flex items-center gap-4">
                <Smile className="h-6 w-6" />
              <div className="text-left">
                <div className="font-medium text-foreground">Personality</div>
                <div className="text-sm font-normal text-muted-foreground">Determines the tone of voice for AI-generated messages.</div>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent className="p-4 border-t border-border space-y-4">
            <div className="flex flex-wrap gap-2">
              {personalityTraits.map((trait) => (
                <Toggle
                  key={trait.id}
                  pressed={trait.selected}
                  onPressedChange={() => toggleTrait(trait.id)}
                  variant="outline"
                  size="sm"
                  className="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground border-border"
                >
                  {trait.icon}
                  {trait.label}
                </Toggle>
              ))}
            </div>
            <div className="flex gap-2">
              <Button size="sm">
                <Check /> Save
              </Button>
              <Button variant="outline" size="sm" className="bg-transparent" onClick={() => handleCancel('personality')}>
                <X /> Cancel
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* General Instruction Section */}
        <AccordionItem value="general-instruction" className="border border-border rounded-xl">
          <AccordionTrigger className="hover:no-underline p-4">
            <div className="flex items-center gap-4">
                <FileText className="h-6 w-6" />
              <div className="text-left">
                <div className="font-medium text-foreground">General Instruction</div>
                <div className="text-sm font-normal text-muted-foreground">Provide general instructions or information for the AI.</div>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent className="p-4 border-t border-border space-y-4">
            <Textarea
              value={generalInstruction}
              onChange={(e) => setGeneralInstruction(e.target.value)}
              placeholder="Enter instructions for the AI..."
              className="bg-muted border-border min-h-[100px]"
            />
            <div className="flex gap-2">
              <Button size="sm" className="gap-1.5">
                <Check /> Save
              </Button>
              <Button variant="outline" size="sm" className="bg-transparent" onClick={() => handleCancel('general-instruction')}>
                <X /> Cancel
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* AI Unable to Assist Section */}
        <AccordionItem value="ai-unable" className="border border-border rounded-xl">
        <AccordionTrigger className="hover:no-underline p-4">
          <div className="flex items-center gap-4">
            <AlertCircle className="h-6 w-6" />
            <div className="text-left">
              <div className="font-medium text-foreground">
                If AI agent is unable to assist user
              </div>
              <div className="text-sm text-muted-foreground">
                Choose what happens when the AI agent is unable to help the customer.
              </div>
            </div>
          </div>
        </AccordionTrigger>

        <AccordionContent className="border-t border-border p-4 space-y-4">
          <Label className='text-muted-foreground'>If AI agent is unable to assist user</Label>
          <Select value={aiFallback} onValueChange={(v) => setAiFallback(String(v))}>
            <SelectTrigger className="w-full h-10">
              <SelectValue placeholder="Select fallback behavior" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="transfer">
                Transfer customer to first available agent or put into queue
              </SelectItem>
              <SelectItem value="message">
                Show custom message only
              </SelectItem>
            </SelectContent>
          </Select>

          <div className="space-y-2">
            <Label className='text-muted-foreground'>Custom Instructions</Label>
            <Textarea
              className="min-h-[120px] bg-transparent"
              placeholder="Define fallback behavior..."
              value={aiFallbackCustom}
              onChange={(e) => setAiFallbackCustom(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-4">
            <Switch checked={aiFallbackWait} onCheckedChange={(v) => setAiFallbackWait(!!v)} />
            <div className="space-y-0.5">
              <Label>Wait for customer confirmation before transferring</Label>
            </div>
          </div>

          <div className="flex gap-2">
            <Button size="sm">
              <Check className="h-4 w-4 mr-1" />
              Save
            </Button>
            <Button size="sm" variant="outline" onClick={() => handleCancel('ai-unable')}>
              <X className="h-4 w-4 mr-1" />
              Cancel
            </Button>
          </div>
        </AccordionContent>
      </AccordionItem>

        {/* Human Agent Section */}
        <AccordionItem value="human-agent" className="border border-border rounded-xl">
          <AccordionTrigger className="hover:no-underline p-4">
            <div className="flex items-center gap-4">
                <BadgeCheck  className="h-6 w-6" />
              <div className="text-left">
                <div className="font-medium text-foreground">If customer asks to speak to a human agent</div>
                <div className="text-sm font-normal text-muted-foreground">Transfer customer to the first available agent or put them into a queue.</div>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent className="p-4 border-t border-border space-y-4">
            <Label className='text-muted-foreground'>Transfer Message</Label>
            <Textarea
              placeholder="Define transfer behavior..."
              className="bg-transparent border-border min-h-[100px]"
              value={humanTransferMessage}
              onChange={(e) => setHumanTransferMessage(e.target.value)}
            />
            <div className="flex gap-2">
              <Button size="sm">
                <Check />
                Save
              </Button>
              <Button variant="outline" size="sm" className="bg-transparent" onClick={() => handleCancel('human-agent')}>
                <X /> Cancel
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
