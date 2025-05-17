/**
 * Binary Placement Algorithm for Talk Fusion PowerLine Platform
 * 
 * This module implements the outer-edge binary placement algorithm
 * for the PowerLine recruitment system.
 */

const mongoose = require('mongoose');
const Promoter = require('../models/Promoter');

/**
 * Places a new member in the binary tree using outer-edge algorithm
 * - New promoters are placed on the outer edges of either left or right legs
 * - Members are placed on the outermost position of their sponsor's preferred leg
 * 
 * @param {String} newMemberId - MongoDB ID of the new promoter
 * @param {String} sponsorId - MongoDB ID of the sponsor
 * @returns {Object} Placement result with leg and parent information
 */
const placeInBinary = async (newMemberId, sponsorId) => {
  try {
    // Find the sponsor
    const sponsor = await Promoter.findById(sponsorId);
    if (!sponsor) {
      throw new Error('Sponsor not found');
    }
    
    // Determine which leg the sponsor prefers for this placement
    const preferredLeg = sponsor.defaultLeg || await getDefaultLeg(sponsor);
    
    // Find the outermost position in that leg
    const placementPosition = await findOutermostPositionInLeg(sponsorId, preferredLeg);
    
    // Place the new member at that position
    await createBinaryRelationship(placementPosition.parentId, newMemberId, placementPosition.position);
    
    // Log the placement for tracking
    console.log(`Placed member ${newMemberId} under ${placementPosition.parentId} in ${placementPosition.position} leg`);
    
    // Return placement information
    return {
      success: true,
      position: placementPosition,
      leg: preferredLeg
    };
  } catch (err) {
    console.error(`Error in binary placement: ${err.message}`);
    throw err;
  }
};

/**
 * Finds the outermost position in the specified leg
 * This ensures we only place on the outside edges of the tree
 * 
 * @param {String} sponsorId - MongoDB ID of starting position
 * @param {String} preferredLeg - 'left' or 'right' leg
 * @returns {Object} Parent ID and position for placement
 */
const findOutermostPositionInLeg = async (sponsorId, preferredLeg) => {
  // Start with the sponsor's position
  let currentMemberId = sponsorId;
  
  // Find the "main line" down the preferred leg
  while (true) {
    // Check if there's already someone in the preferred position
    const childId = await getBinaryChildId(currentMemberId, preferredLeg);
    
    if (childId) {
      // Move down to that position and continue
      currentMemberId = childId;
    } else {
      // Found an empty spot on the outer edge of the preferred leg
      return {
        parentId: currentMemberId,
        position: preferredLeg
      };
    }
  }
};

/**
 * Gets the ID of a child in the specified position
 * 
 * @param {String} parentId - MongoDB ID of the parent
 * @param {String} position - 'left' or 'right' position
 * @returns {String|null} Child ID or null if no child exists
 */
const getBinaryChildId = async (parentId, position) => {
  const fieldToCheck = position === 'left' ? 'leftTeam' : 'rightTeam';
  
  const parent = await Promoter.findById(parentId);
  if (!parent) return null;
  
  // Check if the position has any children
  if (parent[fieldToCheck] && parent[fieldToCheck].length > 0) {
    return parent[fieldToCheck][0]; // Return the first child in that position
  }
  
  return null;
};

/**
 * Creates a binary relationship between parent and child
 * 
 * @param {String} parentId - MongoDB ID of the parent
 * @param {String} childId - MongoDB ID of the child
 * @param {String} position - 'left' or 'right' position
 */
const createBinaryRelationship = async (parentId, childId, position) => {
  const fieldToUpdate = position === 'left' ? 'leftTeam' : 'rightTeam';
  
  // Add child to parent's team
  await Promoter.findByIdAndUpdate(parentId, {
    $push: { [fieldToUpdate]: childId }
  });
  
  // Update volume in the binary tree
  await updateVolumeInBinaryTree(parentId, childId);
};

/**
 * Updates volume in the binary tree based on new member's package
 * 
 * @param {String} parentId - MongoDB ID of the parent
 * @param {String} childId - MongoDB ID of the child
 */
const updateVolumeInBinaryTree = async (parentId, childId) => {
  // Find the child to get their package value
  const child = await Promoter.findById(childId);
  if (!child) return;
  
  // Determine volume based on package
  let volume = 0;
  switch(child.package) {
    case 'starter': volume = 100; break;
    case 'elite': volume = 200; break;
    case 'pro': volume = 400; break;
    default: volume = 0;
  }
  
  // If no volume, exit early
  if (volume === 0) return;
  
  // Get the parent
  const parent = await Promoter.findById(parentId);
  if (!parent) return;
  
  // Determine which leg the child is in
  const isInLeftTeam = parent.leftTeam.some(id => id.toString() === childId.toString());
  const isInRightTeam = parent.rightTeam.some(id => id.toString() === childId.toString());
  
  // Update the appropriate volume
  if (isInLeftTeam) {
    await Promoter.findByIdAndUpdate(parentId, {
      $inc: { leftTeamVolume: volume }
    });
  } else if (isInRightTeam) {
    await Promoter.findByIdAndUpdate(parentId, {
      $inc: { rightTeamVolume: volume }
    });
  }
  
  // Recursively update volume up the tree
  // First, find the promoter who is this parent's sponsor
  const grandparent = await Promoter.findOne({ 
    $or: [
      { leftTeam: parent._id },
      { rightTeam: parent._id }
    ]
  });
  
  if (grandparent) {
    await updateVolumeInBinaryTree(grandparent._id, parent._id);
  }
};

/**
 * Determines the default leg based on sponsor's team balance
 * 
 * @param {Object} sponsor - Sponsor promoter object
 * @returns {String} 'left' or 'right' leg recommendation
 */
const getDefaultLeg = async (sponsor) => {
  // If sponsor has a saved preference, use that
  if (sponsor.defaultLeg) {
    return sponsor.defaultLeg;
  }
  
  // Otherwise, check team balance
  const leftCount = sponsor.leftTeam ? sponsor.leftTeam.length : 0;
  const rightCount = sponsor.rightTeam ? sponsor.rightTeam.length : 0;
  
  // Place on the leg with fewer members for better balance
  return leftCount <= rightCount ? 'left' : 'right';
};

module.exports = {
  placeInBinary,
  findOutermostPositionInLeg,
  createBinaryRelationship,
  updateVolumeInBinaryTree
};